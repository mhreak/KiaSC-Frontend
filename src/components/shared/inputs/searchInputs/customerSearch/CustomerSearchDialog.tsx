import { columns, users } from "@/app/person-list/_components/TableHandler";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface Props {
  onCustomerSelect: (id:number, name:string) => void
}

export function CustomerSearchDialog({onCustomerSelect}:Readonly<Props>) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="absolute left-2 top-1/2 size-6 -translate-y-1/2 bg-secondary text-secondary-foreground cursor-pointer rounded-full p-5"
          >
            <Search className="size-5" />
          </Button>
        }
      />
      <DialogContent className="md:max-w-full md:w-fit h-170 overflow-auto">
        <DialogHeader>
          <DialogTitle className={"font-bold text-xl text-center w-full"}>
            جستجوی مشتریان
          </DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          <DataTable
            columns={columns}
            data={users}
            onPageChanged={(currentPage) => {
            }}
            onPageSizeChanged={(currentPageSize) => {
            }}
            selectionMode="single"
            onSelectionChange={(rows) => {
              if (rows.length>0) {
                onCustomerSelect(rows[0].id, rows[0].fullName)
              }
            }}
          />
        </div>

        <DialogFooter className="flex flex-row md:justify-between">
          
          <DialogClose render={<Button>تایید</Button>} />
          <DialogClose render={<Button variant="destructive">بستن</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
