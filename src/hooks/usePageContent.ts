import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePageContent(sectionId: string) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        console.log(`[usePageContent] Fetching content for section: ${sectionId}`);
        const { data, error } = await supabase
          .from("page_content")
          .select("*")
          .eq("section_id", sectionId)
          .eq("is_visible", true)
          .single();

        if (error) {
          console.log(`[usePageContent] Error fetching ${sectionId}:`, error);
          throw error;
        }
        console.log(`[usePageContent] Loaded content for ${sectionId}:`, data);
        setContent(data?.content || null);
      } catch (err: any) {
        console.error(`[usePageContent] Failed to load ${sectionId}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();

    // Set up realtime subscription for updates
    console.log(`[usePageContent] Setting up realtime for section: ${sectionId}`);
    const channel = supabase
      .channel(`page_content_${sectionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'page_content',
          filter: `section_id=eq.${sectionId}`
        },
        (payload) => {
          console.log(`[usePageContent] ✅ Realtime update received for ${sectionId}:`, payload);
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const newData = payload.new as any;
            console.log(`[usePageContent] New data for ${sectionId}:`, newData);
            if (newData.is_visible) {
              setContent(newData.content);
              console.log(`[usePageContent] Content updated for ${sectionId}!`);
            } else {
              setContent(null);
              console.log(`[usePageContent] Content hidden for ${sectionId}`);
            }
          } else if (payload.eventType === 'DELETE') {
            setContent(null);
            console.log(`[usePageContent] Content deleted for ${sectionId}`);
          }
        }
      )
      .subscribe((status) => {
        console.log(`[usePageContent] Channel subscription status for ${sectionId}:`, status);
      });

    return () => {
      console.log(`[usePageContent] Cleaning up subscription for ${sectionId}`);
      supabase.removeChannel(channel);
    };
  }, [sectionId]);

  return { content, loading, error };
}
