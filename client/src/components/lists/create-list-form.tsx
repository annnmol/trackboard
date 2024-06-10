import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

//user defined
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useListService from "@/hooks/useListService";
import {
  CreateListValidator,
  TCreateListValidator,
  createListIntialValues,
} from "@/validations/auth-validation";

interface Props {
  data?: IList | undefined;
  trigger: React.ReactNode;
}

const CreateListForm = ({
  data = undefined,
  trigger = (
    <Button variant="default">
      <Plus size={20} className="mr-2 text-sm text-white" />
      Add List
    </Button>
  ),
}: Props) => {
  const actionType = data?._id ? "Edit" : "Create";

  const { loading, createList, deleteList, updateList } = useListService();
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm<TCreateListValidator>({
    resolver: zodResolver(CreateListValidator),
    defaultValues:
      actionType === "Edit" ? { title: data?.title } : createListIntialValues,
  });

  const onSubmit = async (values: TCreateListValidator) => {
    // console.log("submut", values);
    createList(values.title).then(() => {
      setSheetOpen(false);
      form.reset();
      form.clearErrors();
    });
  };

  const onDelete = async (values: IList) => {
    // console.log("onDelete", values);
    deleteList(values?._id as string).then(() => {
      setSheetOpen(false);
      form.reset();
      form.clearErrors();
    });
  };

  const onUpdate = async (values: TCreateListValidator) => {
    if (!data) return;
    const result = { ...data, ...values };
    updateList(data?._id as string, result).then(() => {
      setSheetOpen(false);
      form.reset();
      form.clearErrors();
    });
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{actionType} List</SheetTitle>
          <SheetDescription>
            {actionType === "Edit" ? "Edit" : "Add a new"} list to your board.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form
            onSubmit={
              actionType === "Edit"
                ? form.handleSubmit(onUpdate)
                : form.handleSubmit(onSubmit)
            }
            className="flex flex-col gap-2 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>List name</FormLabel>
                  <FormControl>
                    <Input placeholder="Active" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-8 gap-4">
              <Button
                className=""
                type="button"
                variant={"ghost"}
                onClick={() => setSheetOpen(false)}
              >
                cancel
              </Button>

              {actionType === "Edit" && data?._id && (
                <Button
                  className=""
                  type="button"
                  onClick={() => onDelete(data)}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              )}

              <Button className="w-[40%]" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {actionType === "Edit" ? "Update" : "Create"}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default CreateListForm;
