// lib/form-evaluator.ts

export function resolveValue(param: any, formValues: Record<string, any>): any {
  if (typeof param === "function") {
    return param(formValues); // تابع را با مقادیر زنده فرم اجرا کن
  }
  return param; // اگر تابع نبود، خود مقدار ثابت را برگردان
}
