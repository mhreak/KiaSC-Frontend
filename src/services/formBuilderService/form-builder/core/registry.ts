import { z } from "zod";

/**
 * Pure, RHF-agnostic properties injected into every registered field component.
 * Explicitly typed without generic extension fallbacks.
 */
export interface FieldComponentProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  error?: { message?: string };
  disabled?: boolean;
  readOnly?: boolean;
  config: any; // The original JSON schema node configuration
}

export interface FormFieldPlugin {
  type: string;
  component: React.ComponentType<FieldComponentProps>;
  toZodSchema: (config: any) => z.ZodTypeAny;
}

export class FormRegistry {
  private static readonly plugins = new Map<string, FormFieldPlugin>();

  public static register(plugin: FormFieldPlugin): void {
    this.plugins.set(plugin.type, plugin);
  }

  public static get(type: string): FormFieldPlugin | undefined {
    return this.plugins.get(type);
  }

  public static has(type: string): boolean {
    return this.plugins.has(type);
  }

  public static unregister(type: string): boolean {
    return this.plugins.delete(type);
  }

  public static clear(): void {
    this.plugins.clear();
  }
}
