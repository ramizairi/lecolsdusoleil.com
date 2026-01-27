import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Download, Loader2, Mail, Users } from "lucide-react";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type SubscriberRow = {
  id: string;
  email: string;
  country: string | null;
  createdAt: string;
};

const PAGE_SIZES = [10, 20, 30, 40, 50];

const AdminNewsletter = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const loadSubscribers = async (requestedPage = page, requestedPageSize = pageSize) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/newsletter?page=${requestedPage}&pageSize=${requestedPageSize}`,
        { credentials: "include" },
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Erreur de chargement");
      }

      setSubscribers(data.data.subscribers ?? []);
      setTotal(data.data.total ?? 0);
    } catch (error) {
      toast({
        title: "Chargement impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, [page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/admin/newsletter/export", { credentials: "include" });
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Export impossible.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Export impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Seo
        title="Admin - Newsletter"
        description="Liste des inscrits a la newsletter"
        noindex
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 text-primary" />
              <div>
                <h1 className="text-3xl font-serif font-bold">Newsletter</h1>
                <p className="text-muted-foreground">Suivi des inscrits</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2" onClick={() => router.push("/admin/dashboard")}>
                <ArrowLeft className="w-4 h-4" />
                Retour au dashboard
              </Button>
              <Button className="gap-2" onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isDownloading ? "Export..." : "Telecharger XLSX"}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Liste des inscrits
                </CardTitle>
                <CardDescription>Total: {total}</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Afficher</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    const nextSize = Number.parseInt(value, 10);
                    setPageSize(nextSize);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZES.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">par page</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-muted-foreground">
                    <tr>
                      <th className="text-left font-medium px-4 py-3">Date</th>
                      <th className="text-left font-medium px-4 py-3">Email</th>
                      <th className="text-left font-medium px-4 py-3">Pays</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Chargement...
                          </span>
                        </td>
                      </tr>
                    ) : subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                          Aucun inscrit pour le moment.
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-t border-border">
                          <td className="px-4 py-3 text-foreground">
                            {subscriber.createdAt
                              ? new Date(subscriber.createdAt).toLocaleDateString("fr-FR")
                              : "-"}
                          </td>
                          <td className="px-4 py-3 text-foreground">{subscriber.email}</td>
                          <td className="px-4 py-3 text-foreground">
                            {subscriber.country ? subscriber.country : "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page} / {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page <= 1 || isLoading}
                  >
                    Precedent
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={page >= totalPages || isLoading}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminNewsletter;
