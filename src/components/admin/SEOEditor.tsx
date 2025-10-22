import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Plus, X } from "lucide-react";

interface SEOSettings {
  id: string;
  page_path: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string | null;
}

export function SEOEditor() {
  const [settings, setSettings] = useState<SEOSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSettings, setCurrentSettings] = useState<Partial<SEOSettings>>({
    page_path: "/",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    robots: "index, follow",
  });
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .order("page_path");

      if (error) throw error;
      setSettings(data || []);
    } catch (error: any) {
      toast.error("Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting: SEOSettings) => {
    setEditingId(setting.id);
    setCurrentSettings(setting);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from("seo_settings")
          .update(currentSettings)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("SEO settings updated");
      } else {
        if (!currentSettings.page_path) {
          toast.error("Page path is required");
          return;
        }

        const { error } = await supabase
          .from("seo_settings")
          .insert([{
            page_path: currentSettings.page_path,
            meta_title: currentSettings.meta_title || null,
            meta_description: currentSettings.meta_description || null,
            meta_keywords: currentSettings.meta_keywords || null,
            og_title: currentSettings.og_title || null,
            og_description: currentSettings.og_description || null,
            og_image: currentSettings.og_image || null,
            canonical_url: currentSettings.canonical_url || null,
            robots: currentSettings.robots || "index, follow",
          }]);

        if (error) throw error;
        toast.success("SEO settings created");
      }

      setEditingId(null);
      setCurrentSettings({
        page_path: "/",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        og_title: "",
        og_description: "",
        og_image: "",
        canonical_url: "",
        robots: "index, follow",
      });
      loadSettings();
    } catch (error: any) {
      toast.error("Failed to save SEO settings");
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setCurrentSettings({
        ...currentSettings,
        meta_keywords: [
          ...(currentSettings.meta_keywords || []),
          newKeyword.trim(),
        ],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setCurrentSettings({
      ...currentSettings,
      meta_keywords: (currentSettings.meta_keywords || []).filter(
        (k) => k !== keyword
      ),
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">SEO Management</h2>
          <p className="text-text-secondary mt-1">
            Optimize your pages for search engines
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null);
            setCurrentSettings({
              page_path: "/new-page",
              meta_title: "",
              meta_description: "",
              meta_keywords: [],
              og_title: "",
              og_description: "",
              og_image: "",
              canonical_url: "",
              robots: "index, follow",
            });
          }}
          className="btn-hero"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Existing Pages */}
      <div className="grid gap-4">
        {settings.map((setting) => (
          <Card key={setting.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-text-primary">
                  {setting.page_path}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {setting.meta_title}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(setting)}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Editor Form */}
      {(editingId !== null || !editingId) && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            {editingId ? "Edit SEO Settings" : "New Page SEO"}
          </h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="page_path">Page Path</Label>
              <Input
                id="page_path"
                value={currentSettings.page_path}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    page_path: e.target.value,
                  })
                }
                placeholder="/"
              />
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={currentSettings.meta_title || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    meta_title: e.target.value,
                  })
                }
                placeholder="Page Title - ClubGrub"
                maxLength={60}
              />
              <p className="text-xs text-text-secondary mt-1">
                {currentSettings.meta_title?.length || 0}/60 characters
              </p>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={currentSettings.meta_description || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    meta_description: e.target.value,
                  })
                }
                placeholder="A brief description of the page"
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-text-secondary mt-1">
                {currentSettings.meta_description?.length || 0}/160 characters
              </p>
            </div>

            <div>
              <Label>Meta Keywords</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                  placeholder="Add keyword"
                />
                <Button onClick={handleAddKeyword} type="button">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(currentSettings.meta_keywords || []).map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="gap-2">
                    {keyword}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleRemoveKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="og_title">Open Graph Title</Label>
              <Input
                id="og_title"
                value={currentSettings.og_title || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    og_title: e.target.value,
                  })
                }
                placeholder="Social media share title"
              />
            </div>

            <div>
              <Label htmlFor="og_description">Open Graph Description</Label>
              <Textarea
                id="og_description"
                value={currentSettings.og_description || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    og_description: e.target.value,
                  })
                }
                placeholder="Social media share description"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="og_image">Open Graph Image URL</Label>
              <Input
                id="og_image"
                value={currentSettings.og_image || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    og_image: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={currentSettings.canonical_url || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    canonical_url: e.target.value,
                  })
                }
                placeholder="https://clubgrub.com/page"
              />
            </div>

            <div>
              <Label htmlFor="robots">Robots</Label>
              <Input
                id="robots"
                value={currentSettings.robots || ""}
                onChange={(e) =>
                  setCurrentSettings({
                    ...currentSettings,
                    robots: e.target.value,
                  })
                }
                placeholder="index, follow"
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="w-4 h-4 mr-2" />
                Save SEO Settings
              </Button>
              {editingId && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentSettings({
                      page_path: "/",
                      meta_title: "",
                      meta_description: "",
                      meta_keywords: [],
                      og_title: "",
                      og_description: "",
                      og_image: "",
                      canonical_url: "",
                      robots: "index, follow",
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
