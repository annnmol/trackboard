import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

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

  const {loading,createList,deleteList,updateList} = useListService();

  const form = useForm<TCreateListValidator>({
    resolver: zodResolver(CreateListValidator),
    defaultValues: actionType === "Edit" ? {title:data?.title} : createListIntialValues,
  });

  const onSubmit = async (values: TCreateListValidator) => {
    // console.log("submut", values);
    createList(values.title);
  };
  
  const onDelete = async (values: IList) => {
    // console.log("onDelete", values);
    deleteList(values?._id as string);
  };
  
  const onUpdate = async (values: TCreateListValidator) => {
    if(!data) return;
    const result = { ...data, ...values };
    updateList(data?._id as string, result);
  };

  return (
    <Sheet>
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
            onSubmit={actionType === "Edit" ? form.handleSubmit(onUpdate) : form.handleSubmit(onSubmit)}
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
              <SheetClose asChild>
                <Button className="" variant={"ghost"}>
                  cancel
                </Button>
              </SheetClose>
              {
                actionType === "Edit" && data?._id && (
                  <SheetClose asChild onClick={()=>onDelete(data)}>
                    <Button className="" variant={"destructive"}>
                      Delete
                    </Button>
                  </SheetClose>
                )
              }
              <SheetClose asChild>
                <Button className="w-[40%]" type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {actionType === "Edit" ? "Update" : "Create"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default CreateListForm;
