import { useEffect, useState } from "react";
import { getConfig, setConfig } from "../../mockApi";
import { SystemConfig, LlmProvider } from "../../types";

export default function AdminConfig() {
  const [cfg, setCfg] = useState<SystemConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getConfig().then(setCfg);
  }, []);

  const save = async () => {
    if (!cfg) return;
    setSaving(true);
    const updated = await setConfig(cfg);
    setCfg(updated);
    setSaving(false);
  };

  if (!cfg) return <div>Loading...</div>;

  const providers: LlmProvider[] = ["LocalMock", "OpenAI", "Anthropic", "AzureOpenAI"];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Admin • System Config</h2>
      <div className="flex items-center gap-4">
        <label className="text-sm">LLM Provider</label>
        <select value={cfg.llmProvider} onChange={e=>setCfg({ ...cfg, llmProvider: e.target.value as LlmProvider })} className="border rounded p-2">
          {providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={save} disabled={saving} className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-black disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">This only affects mock mediator messages for now.</p>
    </div>
  );
}
