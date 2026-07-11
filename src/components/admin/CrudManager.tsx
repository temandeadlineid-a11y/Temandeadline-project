"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Inbox,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn, parseFeatures } from "@/lib/utils";
import { Card, PageHeader, Badge } from "@/components/admin/ui";

// ============================================================
// CrudManager — satu komponen untuk semua kebutuhan kelola data.
// Cukup kirim konfigurasi field & kolom, semua halaman admin
// (layanan, harga, testimoni, FAQ, tim) memakai komponen ini.
// ============================================================

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "lines" | "emoji";
  placeholder?: string;
  hint?: string;
  half?: boolean; // tampil setengah lebar di form
};

export type ColumnDef = { key: string; label: string };

type Item = Record<string, any> & { id: string };

type Props = {
  title: string;
  description: string;
  endpoint: string;
  itemLabel: string;
  fields: FieldDef[];
  listCols: ColumnDef[];
  hasActive?: boolean;
};

export function CrudManager({
  title,
  description,
  endpoint,
  itemLabel,
  fields,
  listCols,
  hasActive = true,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<null | { item: Item | null }>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error();
      setItems(await res.json());
      setError("");
    } catch {
      setError("Gagal memuat data. Cek koneksi database.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  // ---------- helper form ----------
  function itemToForm(item: Item | null): Record<string, any> {
    const f: Record<string, any> = {};
    fields.forEach((fd) => {
      const raw = item ? item[fd.key] : undefined;
      if (fd.type === "checkbox") f[fd.key] = raw ?? false;
      else if (fd.type === "number")
        f[fd.key] = raw !== undefined ? String(raw) : String(items.length + 1);
      else if (fd.type === "lines")
        f[fd.key] = raw ? parseFeatures(String(raw)).join("\n") : "";
      else f[fd.key] = raw ?? "";
    });
    return f;
  }

  function formToPayload(): Record<string, any> {
    const p: Record<string, any> = {};
    fields.forEach((fd) => {
      const v = form[fd.key];
      if (fd.type === "checkbox") p[fd.key] = Boolean(v);
      else if (fd.type === "number") p[fd.key] = parseInt(v || "0", 10) || 0;
      else if (fd.type === "lines")
        p[fd.key] = JSON.stringify(
          String(v || "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        );
      else p[fd.key] = String(v ?? "");
    });
    return p;
  }

  function openNew() {
    setForm(itemToForm(null));
    setModal({ item: null });
  }

  function openEdit(item: Item) {
    setForm(itemToForm(item));
    setModal({ item });
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const editing = modal?.item;
      const res = await fetch(
        editing ? `${endpoint}/${editing.id}` : endpoint,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formToPayload()),
        }
      );
      if (!res.ok) throw new Error();
      setModal(null);
      await load();
    } catch {
      setError("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Item) {
    if (!window.confirm(`Hapus ${itemLabel} ini? Tindakan tidak bisa dibatalkan.`))
      return;
    setBusyId(item.id);
    try {
      await fetch(`${endpoint}/${item.id}`, { method: "DELETE" });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleActive(item: Item) {
    setBusyId(item.id);
    try {
      await fetch(`${endpoint}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !item.active }),
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  // ---------- render nilai sel sesuai tipe field ----------
  function renderCell(item: Item, col: ColumnDef) {
    const fd = fields.find((f) => f.key === col.key);
    const raw = item[col.key];
    if (fd?.type === "checkbox")
      return raw ? <Badge tone="pink">Ya</Badge> : <span className="text-slate-300">-</span>;
    if (fd?.type === "lines") {
      const n = parseFeatures(String(raw || "[]")).length;
      return <span className="text-slate-500">{n} poin</span>;
    }
    if (fd?.type === "emoji") return <span className="text-xl">{raw}</span>;
    return (
      <span className="line-clamp-2 max-w-[280px] text-slate-600">
        {String(raw ?? "")}
      </span>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-800 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        action={
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pinkglow transition-all hover:bg-pink-700"
          >
            <Plus className="h-4 w-4" /> Tambah {itemLabel}
          </button>
        }
      />

      {error && (
        <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
          {error}
        </div>
      )}

      {/* ============ LIST ============ */}
      {loading ? (
        <Card className="flex items-center justify-center py-20">
          <Loader2 className="h-7 w-7 animate-spin text-pink-500" />
        </Card>
      ) : items.length === 0 ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <Inbox className="h-10 w-10 text-slate-300" />
          <p className="mt-3 font-semibold text-navy-800">
            Belum ada {itemLabel}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Klik tombol Tambah untuk membuat yang pertama.
          </p>
        </Card>
      ) : (
        <>
          {/* Tabel desktop */}
          <Card className="hidden overflow-hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  {listCols.map((c) => (
                    <th key={c.key} className="px-5 py-3.5">
                      {c.label}
                    </th>
                  ))}
                  {hasActive && <th className="px-5 py-3.5">Status</th>}
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50/60">
                    {listCols.map((c) => (
                      <td key={c.key} className="px-5 py-4 align-top">
                        {renderCell(item, c)}
                      </td>
                    ))}
                    {hasActive && (
                      <td className="px-5 py-4 align-top">
                        <button
                          onClick={() => toggleActive(item)}
                          disabled={busyId === item.id}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
                            item.active
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100"
                          )}
                          title="Klik untuk ubah status tampil"
                        >
                          {item.active ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3" />
                          )}
                          {item.active ? "Tampil" : "Disembunyikan"}
                        </button>
                      </td>
                    )}
                    <td className="px-5 py-4 text-right align-top">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-navy-50 hover:text-navy-700"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={busyId === item.id}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-pink-50 hover:text-pink-600"
                          aria-label="Hapus"
                        >
                          {busyId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Kartu mobile */}
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {listCols.slice(0, 2).map((c) => (
                      <div key={c.key} className="mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {c.label}
                        </span>
                        <div className="text-sm">{renderCell(item, c)}</div>
                      </div>
                    ))}
                  </div>
                  {hasActive && (
                    <button onClick={() => toggleActive(item)}>
                      {item.active ? (
                        <Badge tone="green">Tampil</Badge>
                      ) : (
                        <Badge tone="slate">Sembunyi</Badge>
                      )}
                    </button>
                  )}
                </div>
                <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-navy-800"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1.5 text-xs font-semibold text-pink-700"
                  >
                    <Trash2 className="h-3 w-3" /> Hapus
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ============ MODAL FORM ============ */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            onClick={() => !saving && setModal(null)}
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-3xl md:p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-navy-800">
                {modal.item ? `Edit ${itemLabel}` : `Tambah ${itemLabel}`}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((fd) => (
                <div
                  key={fd.key}
                  className={fd.half ? "sm:col-span-1" : "sm:col-span-2"}
                >
                  {fd.type === "checkbox" ? (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={Boolean(form[fd.key])}
                        onChange={(e) =>
                          setForm({ ...form, [fd.key]: e.target.checked })
                        }
                        className="h-4 w-4 accent-pink-600"
                      />
                      <span className="text-sm font-semibold text-navy-800">
                        {fd.label}
                      </span>
                    </label>
                  ) : (
                    <>
                      <label className="block text-sm font-semibold text-navy-800">
                        {fd.label}
                      </label>
                      {fd.type === "textarea" || fd.type === "lines" ? (
                        <textarea
                          rows={fd.type === "lines" ? 5 : 3}
                          value={form[fd.key] ?? ""}
                          onChange={(e) =>
                            setForm({ ...form, [fd.key]: e.target.value })
                          }
                          placeholder={fd.placeholder}
                          className={inputClass}
                        />
                      ) : (
                        <input
                          type={fd.type === "number" ? "number" : "text"}
                          value={form[fd.key] ?? ""}
                          onChange={(e) =>
                            setForm({ ...form, [fd.key]: e.target.value })
                          }
                          placeholder={fd.placeholder}
                          className={inputClass}
                        />
                      )}
                      {fd.hint && (
                        <p className="mt-1 text-xs text-slate-400">{fd.hint}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setModal(null)}
                disabled={saving}
                className="flex-1 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
