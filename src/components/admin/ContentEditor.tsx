import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical, Eye, X, RotateCcw, ArrowUp, ArrowDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContentSection {
  id: string;
  section_id: string;
  content_type: string;
  content: any;
  display_order: number;
  is_visible: boolean;
}

export function ContentEditor() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [originalSections, setOriginalSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [previewSection, setPreviewSection] = useState<ContentSection | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionType, setNewSectionType] = useState("");

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setSections(data || []);
      setOriginalSections(JSON.parse(JSON.stringify(data || [])));
      setHasUnsavedChanges(false);
    } catch (error: any) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update display orders
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index,
    }));

    setSections(updatedItems);
    setHasUnsavedChanges(true);

    // Save to database
    try {
      for (const item of updatedItems) {
        const { error } = await supabase
          .from("page_content")
          .update({ display_order: item.display_order })
          .eq("id", item.id);
        
        if (error) throw error;
      }
      toast.success("Order updated and saved!");
      setOriginalSections(JSON.parse(JSON.stringify(updatedItems)));
      setHasUnsavedChanges(false);
    } catch (error: any) {
      console.error("Failed to update order:", error);
      toast.error(`Failed to update order: ${error.message}`);
      loadSections(); // Reload on error
    }
  };

  const handleSaveAll = async () => {
    try {
      setLoading(true);
      
      for (const section of sections) {
        const { error } = await supabase
          .from("page_content")
          .update({
            content: section.content,
            is_visible: section.is_visible,
            display_order: section.display_order,
          })
          .eq("id", section.id);

        if (error) {
          console.error("Error saving section:", error);
          throw error;
        }
      }

      toast.success("All changes saved and published!");
      setOriginalSections(JSON.parse(JSON.stringify(sections)));
      setHasUnsavedChanges(false);
      setEditingSection(null);
      
      // Force a small delay to ensure realtime propagates
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error: any) {
      console.error("Failed to save changes:", error);
      toast.error(`Failed to save changes: ${error.message}`);
      setLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    if (confirm("Are you sure you want to discard all unsaved changes?")) {
      setSections(JSON.parse(JSON.stringify(originalSections)));
      setHasUnsavedChanges(false);
      setEditingSection(null);
      toast.info("Changes discarded");
    }
  };

  const handleResetToDefault = async (section: ContentSection) => {
    if (!confirm("Reset this section to default? This will reload from the database.")) return;
    
    const original = originalSections.find(s => s.id === section.id);
    if (original) {
      setSections(sections.map(s => s.id === section.id ? JSON.parse(JSON.stringify(original)) : s));
      toast.info("Section reset to saved version");
    }
  };

  const handleToggleVisibility = (section: ContentSection) => {
    setSections(
      sections.map((s) =>
        s.id === section.id ? { ...s, is_visible: !s.is_visible } : s
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleAddSection = async () => {
    if (!newSectionType) return;

    try {
      const newSection = {
        section_id: newSectionType,
        content_type: "custom",
        content: { title: "New Section", description: "Edit me" },
        display_order: sections.length,
        is_visible: true,
      };

      const { data, error } = await supabase
        .from("page_content")
        .insert(newSection)
        .select()
        .single();

      if (error) throw error;

      toast.success("Section added");
      loadSections();
      setShowAddSection(false);
      setNewSectionType("");
    } catch (error: any) {
      toast.error("Failed to add section");
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const { error } = await supabase
        .from("page_content")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Section deleted");
      loadSections();
    } catch (error: any) {
      toast.error("Failed to delete section");
    }
  };

  const handleAddArrayItem = (section: ContentSection, arrayPath: string) => {
    const updatedContent = { ...section.content };
    const keys = arrayPath.split(".");
    let current: any = updatedContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const arrayKey = keys[keys.length - 1];
    if (Array.isArray(current[arrayKey])) {
      current[arrayKey].push({ question: "New Question", answer: "New Answer" });
      setSections(sections.map(s => s.id === section.id ? { ...s, content: updatedContent } : s));
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveArrayItem = (section: ContentSection, arrayPath: string, index: number) => {
    const updatedContent = { ...section.content };
    const keys = arrayPath.split(".");
    let current: any = updatedContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const arrayKey = keys[keys.length - 1];
    if (Array.isArray(current[arrayKey])) {
      current[arrayKey].splice(index, 1);
      setSections(sections.map(s => s.id === section.id ? { ...s, content: updatedContent } : s));
      setHasUnsavedChanges(true);
    }
  };

  const handleMoveArrayItem = (section: ContentSection, arrayPath: string, index: number, direction: 'up' | 'down') => {
    const updatedContent = { ...section.content };
    const keys = arrayPath.split(".");
    let current: any = updatedContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const arrayKey = keys[keys.length - 1];
    if (Array.isArray(current[arrayKey])) {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < current[arrayKey].length) {
        [current[arrayKey][index], current[arrayKey][newIndex]] = [current[arrayKey][newIndex], current[arrayKey][index]];
        setSections(sections.map(s => s.id === section.id ? { ...s, content: updatedContent } : s));
        setHasUnsavedChanges(true);
      }
    }
  };

  const handleImageUpload = async (
    sectionId: string,
    fieldPath: string,
    file: File
  ) => {
    try {
      setUploadingImage(sectionId);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("content-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("content-images").getPublicUrl(filePath);

      // Update the section content with the new image URL
      const section = sections.find((s) => s.id === sectionId);
      if (!section) return;

      const updatedContent = { ...section.content };
      const keys = fieldPath.split(".");
      let current = updatedContent;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = publicUrl;

      setSections(
        sections.map((s) =>
          s.id === sectionId ? { ...s, content: updatedContent } : s
        )
      );
      setHasUnsavedChanges(true);

      toast.success("Image uploaded successfully. Click 'Save All Changes' to publish.");
    } catch (error: any) {
      console.error("Failed to upload image:", error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploadingImage(null);
    }
  };

  const renderContentField = (
    section: ContentSection,
    key: string,
    value: any,
    path: string = ""
  ): JSX.Element => {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === "string" && value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return (
        <div key={currentPath} className="space-y-2">
          <Label>{key}</Label>
          <div className="flex items-center gap-2">
            <img
              src={value}
              alt={key}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(section.id, currentPath, file);
                }}
                disabled={uploadingImage === section.id}
              />
              <Input
                value={value}
                onChange={(e) => {
                  const updatedContent = { ...section.content };
                  const keys = currentPath.split(".");
                  let current = updatedContent;
                  for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                  }
                   current[keys[keys.length - 1]] = e.target.value;
                  setSections(
                    sections.map((s) =>
                      s.id === section.id ? { ...s, content: updatedContent } : s
                    )
                  );
                  setHasUnsavedChanges(true);
                }}
                placeholder="Or paste image URL"
              />
            </div>
          </div>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={currentPath} className="space-y-3 pl-4 border-l-2">
          <div className="flex items-center justify-between mb-2">
            <Label className="font-semibold">{key} (Array)</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAddArrayItem(section, currentPath)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Item
            </Button>
          </div>
          {value.map((item, index) => (
            <div key={`${currentPath}.${index}`} className="space-y-2 p-3 bg-muted/50 rounded border">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs">Item {index + 1}</Label>
                <div className="flex gap-1">
                  {index > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMoveArrayItem(section, currentPath, index, 'up')}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                  )}
                  {index < value.length - 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMoveArrayItem(section, currentPath, index, 'down')}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveArrayItem(section, currentPath, index)}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </div>
              {typeof item === "object" && item !== null
                ? Object.entries(item).map(([k, v]) =>
                    renderContentField(section, k, v, `${currentPath}.${index}`)
                  )
                : renderContentField(section, `${index}`, item, currentPath)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={currentPath} className="space-y-3 pl-4 border-l-2">
          <Label className="font-semibold">{key}</Label>
          {Object.entries(value).map(([k, v]) =>
            renderContentField(section, k, v, currentPath)
          )}
        </div>
      );
    }

    if (typeof value === "string" && value.length > 50) {
      return (
        <div key={currentPath} className="space-y-2">
          <Label>{key}</Label>
          <Textarea
            value={value}
            onChange={(e) => {
              const updatedContent = { ...section.content };
              const keys = currentPath.split(".");
              let current = updatedContent;
              for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
              }
              current[keys[keys.length - 1]] = e.target.value;
              setSections(
                sections.map((s) =>
                  s.id === section.id ? { ...s, content: updatedContent } : s
                )
              );
              setHasUnsavedChanges(true);
            }}
            rows={3}
          />
        </div>
      );
    }

    return (
      <div key={currentPath} className="space-y-2">
        <Label>{key}</Label>
        <Input
          value={String(value)}
          onChange={(e) => {
            const updatedContent = { ...section.content };
            const keys = currentPath.split(".");
            let current = updatedContent;
            for (let i = 0; i < keys.length - 1; i++) {
              current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = e.target.value;
            setSections(
              sections.map((s) =>
                s.id === section.id ? { ...s, content: updatedContent } : s
              )
            );
            setHasUnsavedChanges(true);
          }}
        />
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Content Management</h2>
          <p className="text-text-secondary mt-1">
            Edit page content, reorder sections, and manage visibility
          </p>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <>
              <Button variant="outline" onClick={handleDiscardChanges}>
                <X className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
              <Button onClick={handleSaveAll} className="btn-hero">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => setShowAddSection(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 font-medium">You have unsaved changes. Remember to save before leaving.</p>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-2 cursor-move"
                        >
                          <GripVertical className="w-5 h-5 text-text-secondary" />
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-text-primary">
                                {section.section_id}
                              </h3>
                              <p className="text-sm text-text-secondary">
                                Type: {section.content_type}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <Label htmlFor={`visible-${section.id}`}>
                                  Visible
                                </Label>
                                <Switch
                                  id={`visible-${section.id}`}
                                  checked={section.is_visible}
                                  onCheckedChange={() =>
                                    handleToggleVisibility(section)
                                  }
                                />
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreviewSection(section)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Preview
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditingSection(
                                    editingSection === section.id
                                      ? null
                                      : section.id
                                  )
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResetToDefault(section)}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSection(section.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          {editingSection === section.id && (
                            <div className="space-y-4 pt-4 border-t">
                              <div className="space-y-4">
                                {Object.entries(section.content).map(
                                  ([key, value]) =>
                                    renderContentField(section, key, value)
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setPreviewSection(section)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {sections.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-text-secondary">
            No content sections yet. Add sections from the frontend to manage them here.
          </p>
        </Card>
      )}

      <Dialog open={!!previewSection} onOpenChange={() => setPreviewSection(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {previewSection?.section_id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-background p-8 rounded-lg border">
              {previewSection && renderPreview(previewSection)}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddSection} onOpenChange={setShowAddSection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Section Type</Label>
              <Select value={newSectionType} onValueChange={setNewSectionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose section type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                  <SelectItem value="cta">Call to Action</SelectItem>
                  <SelectItem value="custom">Custom Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddSection(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSection} disabled={!newSectionType}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  function renderPreview(section: ContentSection) {
    const { content } = section;
    
    return (
      <div className="space-y-6">
        {content.badge && (
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {content.badge}
          </div>
        )}
        {content.title && (
          <h2 className="text-3xl font-bold text-text-primary">{content.title}</h2>
        )}
        {content.subtitle && (
          <h3 className="text-xl text-text-secondary">{content.subtitle}</h3>
        )}
        {content.description && (
          <p className="text-text-secondary">{content.description}</p>
        )}
        {content.image && (
          <img src={content.image} alt="Preview" className="w-full max-w-md rounded-lg" />
        )}
        {content.items && Array.isArray(content.items) && (
          <div className="space-y-4">
            {content.items.map((item: any, index: number) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                {item.question && <p className="font-semibold">{item.question}</p>}
                {item.answer && <p className="text-sm text-text-secondary mt-2">{item.answer}</p>}
                {item.title && <p className="font-semibold">{item.title}</p>}
                {item.description && <p className="text-sm text-text-secondary mt-2">{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
