"use client";

import React from "react";

type ApiParamConfig = {
  key: string;
  label: string;
  type?: "number" | "text";
  value: string | number;
};

type ApiParamsModalProps = {
  open: boolean;
  title?: string;
  params: ApiParamConfig[];
  onChange: (key: string, value: string) => void;
  onApply: () => void;
  onClose: () => void;
};

export default function ApiParamsModal({
  open,
  title = "Adjust API Parameters",
  params,
  onChange,
  onApply,
  onClose,
}: ApiParamsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg bg-gray-900 text-gray-100 p-4 shadow-lg border border-gray-700">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            className="text-xs text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {params.map((param) => (
            <div key={param.key} className="flex flex-col space-y-1 text-xs">
              <label className="font-medium text-gray-300">
                {param.label}
              </label>
              <input
                type={param.type ?? "text"}
                className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 placeholder-gray-400 outline-none focus:ring focus:ring-pink-500"
                value={param.value}
                onChange={(e) => onChange(param.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end space-x-2 text-xs">
          <button
            className="rounded border border-gray-600 px-3 py-1 text-gray-300 hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-pink-600 px-3 py-1 text-white hover:bg-pink-700 transition-colors"
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}