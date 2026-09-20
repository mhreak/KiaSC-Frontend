import {
  ArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileType2Icon,
  FileTypeIcon,
  ImageIcon,
  PresentationIcon,
} from "lucide-react";

export const getFileIconConfig = (extension: string) => {
  const ext = extension.toLowerCase().replace(".", "");

  switch (ext) {
    case "pdf":
      return {
        icon: FileType2Icon,
        className: "bg-red-50 text-red-600",
      };

    case "doc":
    case "docx":
      return {
        icon: FileTextIcon,
        className: "bg-blue-50 text-blue-600",
      };

    case "xls":
    case "xlsx":
      return {
        icon: FileSpreadsheetIcon,
        className: "bg-emerald-50 text-emerald-600",
      };

    case "csv":
      return {
        icon: FileSpreadsheetIcon,
        className: "bg-green-50 text-green-600",
      };

    case "ppt":
    case "pptx":
      return {
        icon: PresentationIcon,
        className: "bg-orange-50 text-orange-600",
      };

    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return {
        icon: ArchiveIcon,
        className: "bg-purple-50 text-purple-600",
      };

    case "svg":
      return {
        icon: ImageIcon,
        className: "bg-amber-50 text-amber-600",
      };

    case "txt":
      return {
        icon: FileTextIcon,
        className: "bg-slate-50 text-slate-600",
      };

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
    case "bmp":
    case "ico":
      return {
        icon: ImageIcon,
        className: "bg-pink-50 text-pink-600",
      };

    default:
      return {
        icon: FileIcon,
        className: "bg-slate-50 text-slate-600",
      };
  }
};
