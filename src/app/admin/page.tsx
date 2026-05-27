"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Lock, Save, Trash2, Edit2, Plus, 
  LogOut, Star, MapPin, Video, Sparkles, BookOpen 
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"perspective" | "creative" | "reflective">("perspective");
  
  // Database state
  const [db, setDb] = useState<any>({
    perspective: [],
    creative: [],
    reflective: []
  });

  // Modal forms state
  const [isEditing, setIsEditing] = useState<string | null>(null); // "new" or id of editing item
  const [formState, setFormState] = useState<any>({});

  // Session recovery
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_session_password");
    if (savedPassword) {
      authenticate(savedPassword);
    }
  }, []);

  const triggerToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const authenticate = async (pwdToTest = password) => {
    setError("");
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth", password: pwdToTest })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_session_password", pwdToTest);
        setPassword(pwdToTest);
        fetchDb();
      } else {
        setError(data.error || "Invalid password");
        sessionStorage.removeItem("admin_session_password");
      }
    } catch (err) {
      setError("Network or Server error");
    }
  };

  const fetchDb = async () => {
    try {
      const res = await fetch("/api/db");
      if (res.ok) {
        const data = await res.json();
        setDb(data);
      }
    } catch (err) {
      triggerToast("Failed to fetch database content", "error");
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_session_password");
    setPassword("");
    triggerToast("Signed out successfully");
  };

  const saveDbState = async (updatedDb: any) => {
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", password, data: updatedDb })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDb(updatedDb);
        triggerToast("Database saved successfully!");
        setIsEditing(null);
      } else {
        triggerToast(data.error || "Failed to save database", "error");
      }
    } catch (err) {
      triggerToast("Server connection error", "error");
    }
  };

  const handleDeleteItem = (tab: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    const updatedSection = db[tab].filter((item: any) => item.id !== id);
    const updatedDb = { ...db, [tab]: updatedSection };
    saveDbState(updatedDb);
  };

  const handleOpenEditForm = (item: any) => {
    setFormState(item);
    setIsEditing(item.id);
  };

  const handleOpenCreateForm = () => {
    let emptyItem: any = { id: Date.now().toString() };
    if (activeTab === "perspective") {
      emptyItem = { ...emptyItem, year: "", title: "", description: "", note: "", image: "" };
    } else if (activeTab === "creative") {
      emptyItem = { ...emptyItem, title: "", category: "Moments", year: "", description: "", image: "" };
    } else if (activeTab === "reflective") {
      emptyItem = { ...emptyItem, title: "", description: "", link: "", type: "Lecture", duration: "19:00", views: 133, age: "9 months ago" };
    }
    setFormState(emptyItem);
    setIsEditing("new");
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedSection = [...db[activeTab]];

    const finalFormState = { ...formState };


    if (activeTab === "reflective" && finalFormState.type.toLowerCase() === "lecture") {
      finalFormState.views = parseInt(finalFormState.views) || 133;
    }

    if (isEditing === "new") {
      updatedSection.push(finalFormState);
    } else {
      updatedSection = updatedSection.map((item: any) => 
        item.id === isEditing ? finalFormState : item
      );
    }

    const updatedDb = { ...db, [activeTab]: updatedSection };
    saveDbState(updatedDb);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-cream-bg flex flex-col justify-center items-center px-6 relative">
        <Link 
          href="/" 
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream-mid hover:text-cream-ink transition-colors"
        >
          <ArrowLeft size={14} /> Back to Space
        </Link>

        <div className="max-w-md w-full bg-cream-bg border border-cream-muted/50 rounded-2xl p-8 shadow-md">
          <div className="flex justify-center mb-4 text-cream-mid">
            <Lock size={32} />
          </div>
          
          <h1 className="text-center font-serif italic text-3xl text-cream-ink mb-2">
            Admin CMS Portal
          </h1>
          <p className="text-center text-xs text-cream-mid uppercase tracking-widest font-semibold mb-8">
            Ve Tan Boon — Personal Space
          </p>

          <form onSubmit={(e) => { e.preventDefault(); authenticate(); }} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-mid font-semibold mb-2">
                Secret Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-lg border border-cream-muted/50 bg-cream-surface/20 text-cream-ink focus:outline-none focus:border-cream-mid text-sm"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-xs font-semibold">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-cream-ink text-cream-bg text-xs font-semibold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity"
            >
              Unlock Dashboard
            </button>
          </form>
          <p className="text-center text-[10px] text-cream-mid/70 mt-6 leading-relaxed">
            *Default credential is <span className="font-mono bg-cream-surface px-1 py-0.5 rounded">veperspective123</span>.<br/>Configure it in your .env.local via ADMIN_PASSWORD.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-bg flex flex-col">
      {/* Toast popup */}
      {toast.message && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-xs font-bold uppercase tracking-wider text-white ${
          toast.type === "error" ? "bg-red-600" : "bg-teal-600"
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-cream-surface border-b border-cream-muted/30 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 rounded-full border border-cream-muted/50 bg-cream-bg text-cream-mid hover:text-cream-ink transition-colors shadow-sm"
              title="Return to Space"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="font-serif italic text-2xl text-cream-ink font-semibold">Ve Tan Boon</h1>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-cream-mid">CMS Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 border border-red-600/30 rounded-full text-xs font-semibold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </header>

      {/* Dashboard container */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-cream-mid px-3 mb-2">Sections</h3>
          <button
            onClick={() => { setActiveTab("perspective"); setIsEditing(null); }}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
              activeTab === "perspective" ? "bg-cream-ink text-cream-bg shadow-sm" : "hover:bg-cream-surface text-cream-mid hover:text-cream-ink"
            }`}
          >
            <BookOpen size={16} /> Perspective
          </button>
          <button
            onClick={() => { setActiveTab("creative"); setIsEditing(null); }}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
              activeTab === "creative" ? "bg-cream-ink text-cream-bg shadow-sm" : "hover:bg-cream-surface text-cream-mid hover:text-cream-ink"
            }`}
          >
            <Sparkles size={16} /> Creative
          </button>
          <button
            onClick={() => { setActiveTab("reflective"); setIsEditing(null); }}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
              activeTab === "reflective" ? "bg-cream-ink text-cream-bg shadow-sm" : "hover:bg-cream-surface text-cream-mid hover:text-cream-ink"
            }`}
          >
            <Video size={16} /> Reflective
          </button>

        </aside>

        {/* Content Panel */}
        <section className="flex-grow bg-cream-bg border border-cream-muted/30 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* Main Action Header */}
          <div className="flex justify-between items-center border-b border-cream-muted/20 pb-4 mb-6">
            <div>
              <h2 className="font-serif italic text-2xl text-cream-ink uppercase tracking-wide">
                Manage {activeTab}
              </h2>
              <p className="text-xs text-cream-mid font-light mt-0.5">
                Add, modify, or delete items inside the {activeTab} section.
              </p>
            </div>
            
            {!isEditing && (
              <button
                onClick={handleOpenCreateForm}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-cream-ink text-cream-bg text-xs font-semibold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> Add New
              </button>
            )}
          </div>

          {/* If editing mode */}
          {isEditing ? (
            <form onSubmit={handleSaveForm} className="space-y-6 max-w-2xl bg-cream-surface/20 border border-cream-muted/30 p-6 rounded-xl animate-fade-in">
              <h3 className="font-serif italic text-lg text-cream-ink font-semibold border-b border-cream-muted/30 pb-2 mb-4">
                {isEditing === "new" ? "Add New Item" : `Editing Item ID: ${isEditing}`}
              </h3>

              {/* Dynamic Forms based on Tab */}
              {activeTab === "perspective" && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Year</label>
                      <input
                        type="text"
                        placeholder="e.g. 1995"
                        value={formState.year || ""}
                        onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Birth Milestone"
                        value={formState.title || ""}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Full Description</label>
                    <textarea
                      placeholder="Enter detailed description..."
                      value={formState.description || ""}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Handwritten Diary Note</label>
                    <input
                      type="text"
                      placeholder="Short raw personal diary thought..."
                      value={formState.note || ""}
                      onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none font-handwriting text-lg"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === "creative" && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Category</label>
                      <select
                        value={formState.category || "Moments"}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                      >
                        <option value="Moments">Moments</option>
                        <option value="Creations">Creations</option>
                        <option value="Archive">Archive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Year</label>
                      <input
                        type="text"
                        placeholder="e.g. 2024"
                        value={formState.year || ""}
                        onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Film Photo"
                        value={formState.title || ""}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Description</label>
                    <textarea
                      placeholder="Enter detailed description..."
                      value={formState.description || ""}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none h-24"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === "reflective" && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Type</label>
                      <select
                        value={formState.type || "Lecture"}
                        onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                      >
                        <option value="Lecture">Lecture</option>
                        <option value="Slides">Slides</option>
                        <option value="Resources">Resources</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Duration badge (e.g. 19:00)</label>
                      <input
                        type="text"
                        placeholder="e.g. 19:00 or Slide Deck"
                        value={formState.duration || ""}
                        onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Title</label>
                      <input
                        type="text"
                        placeholder="Lecture Title..."
                        value={formState.title || ""}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {formState.type?.toLowerCase() === "lecture" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">View Count (Numeric)</label>
                        <input
                          type="number"
                          placeholder="e.g. 133"
                          value={formState.views || ""}
                          onChange={(e) => setFormState({ ...formState, views: e.target.value })}
                          className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Upload Age (Thai/English)</label>
                        <input
                          type="text"
                          placeholder="e.g. 9 เดือนที่ผ่านมา"
                          value={formState.age || ""}
                          onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                          className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Resource Link URL</label>
                    <input
                      type="url"
                      placeholder="e.g. https://youtube.com/..."
                      value={formState.link || ""}
                      onChange={(e) => setFormState({ ...formState, link: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-cream-mid mb-1">Short Summary</label>
                    <textarea
                      placeholder="Enter description..."
                      value={formState.description || ""}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-muted/50 rounded-lg text-xs bg-cream-bg text-cream-ink focus:outline-none h-24"
                      required
                    />
                  </div>
                </div>
              )}



              {/* Form Buttons */}
              <div className="flex gap-3 border-t border-cream-muted/30 pt-4 mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-cream-ink text-cream-bg text-xs font-semibold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Save size={14} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-cream-muted/60 text-cream-mid hover:text-cream-ink text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-cream-surface transition-all"
                >
                  Cancel
                </button>
              </div>

            </form>
          ) : (
            /* Items List Table/Deck */
            <div className="space-y-4">
              {db[activeTab]?.length === 0 ? (
                <div className="text-center py-12 text-cream-mid italic font-light text-sm">
                  No items listed. Press "Add New" to populate this section.
                </div>
              ) : (
                <div className="divide-y divide-cream-muted/20 border border-cream-muted/30 rounded-xl overflow-hidden bg-cream-bg">
                  {db[activeTab]?.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="p-5 flex items-center justify-between gap-4 transition-all hover:bg-cream-surface/10"
                    >
                      {/* Item Info Block */}
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {item.year && (
                            <span className="text-[10px] font-mono font-bold text-cream-mid bg-cream-surface px-2 py-0.5 rounded border border-cream-muted/20">
                              {item.year}
                            </span>
                          )}
                          {item.category && (
                            <span className="text-[10px] font-semibold text-cream-mid bg-cream-surface px-2 py-0.5 rounded border border-cream-muted/20">
                              {item.category}
                            </span>
                          )}
                          {item.type && (
                            <span className="text-[10px] font-semibold text-cream-mid bg-cream-surface px-2 py-0.5 rounded border border-cream-muted/20">
                              {item.type}
                            </span>
                          )}
                          {item.rating && (
                            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 flex items-center gap-0.5">
                              <Star size={10} className="fill-amber-500 text-amber-500" /> {item.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif italic text-lg font-bold text-cream-ink truncate">
                          {item.title || item.name}
                        </h4>
                        <p className="text-xs text-cream-mid truncate max-w-xl font-light">
                          {item.description || item.review}
                        </p>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleOpenEditForm(item)}
                          className="p-2 border border-cream-muted/60 text-cream-mid hover:text-cream-ink hover:bg-cream-surface rounded-lg transition-all"
                          title="Edit Item"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(activeTab, item.id)}
                          className="p-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
