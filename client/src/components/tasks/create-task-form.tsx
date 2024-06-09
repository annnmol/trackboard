import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

//user defined
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
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
import useTaskService from "@/hooks/useTaskService";
import {
  CreateTaskValidator,
  TCreateTaskValidator,
  createTaskIntialValues,
} from "@/validations/auth-validation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIORITY_TYPE_OPTIONS } from "@/lib/constants";
import useAppStore from "@/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn, formatDateTime } from "@/lib/utils";

interface Props {
  data?: ITask | undefined;
  trigger: React.ReactNode;
}

const CreateTaskForm = ({
  data = undefined,
  trigger = (
    <Button variant="default">
      <Plus size={20} className="mr-2 text-sm text-white" />
      Task
    </Button>
  ),
}: Props) => {
  const actionType = data?._id ? "Edit" : "Create";

  const { loading, createTask, deleteTask, updateTask } = useTaskService();
  const { lists } = useAppStore();

  const form = useForm<TCreateTaskValidator>({
    resolver: zodResolver(CreateTaskValidator),
    defaultValues:
      actionType === "Edit" && data
        ? {
            title: data?.title,
            description: data?.description,
            priority: data?.priority,
            dueDate: data?.dueDate,
            listId: data?.listId,
          }
        : {...createTaskIntialValues, listId:lists?.[0]?._id},
  });

  const onSubmit = async (values: TCreateTaskValidator) => {
    console.log("submut", values);
    createTask(
      values.title,
      values.priority,
      values.description,
      values.dueDate,
      values.listId
    );
    // loginFn(data);
  };

  const onDelete = async (values: ITask) => {
    console.log("onDelete", values);
    deleteTask(values?._id as string);
    // loginFn(data);
  };

  const onUpdate = async (values: TCreateTaskValidator) => {
    console.log("onUpdate", values);
    if (!data) return;
    const result = { ...data, ...values };
    console.log("onUpdaterrr", result);
    updateTask(data?._id as string, result);
    // loginFn(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{actionType} Task</SheetTitle>
          <SheetDescription>
            {actionType === "Edit" ? "Edit" : "Add a new"} Task to your board.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form
            onSubmit={
              actionType === "Edit"
                ? form.handleSubmit(onUpdate)
                : form.handleSubmit(onSubmit)
            }
            className="flex flex-col gap-4 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Task name</FormLabel>
                  <FormControl>
                    <Input placeholder="Active" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Important Task"
                      className="w-full "
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      // {...field}
                      name="priority"
                      value={field.value}
                      onValueChange={(e: string) =>
                        field.onChange(e)
                      }
                    >
                      <SelectTrigger className="w-full min-w-[120px] justify-between">
                        <SelectValue placeholder="medium" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITY_TYPE_OPTIONS?.map((opt, index) => {
                          return (
                            <SelectItem
                              key={opt?.id ?? index?.toString()}
                              value={opt?.id}
                            >
                              {opt?.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="listId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>List</FormLabel>
                  <FormControl>
                    <Select
                      // {...field}
                      name="listId"
                      defaultValue={lists?.[0]?._id as any}
                      value={field.value}
                      onValueChange={(e: "low" | "medium" | "high") =>
                        field.onChange(e)
                      }
                    >
                      <SelectTrigger className="w-full min-w-[120px] justify-between">
                        <SelectValue placeholder="First list" />
                      </SelectTrigger>
                      <SelectContent>
                        {lists?.map((opt, index) => {
                          return (
                            <SelectItem
                              key={index?.toString()}
                              value={opt?._id as any}
                              disabled={actionType === "Create" &&  index !== 0 ? true : false}
                            >
                              {opt?.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                 <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        formatDateTime(field.value).dateOnly
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
              {actionType === "Edit" && data?._id && (
                <SheetClose asChild onClick={() => onDelete(data)}>
                  <Button className="" variant={"destructive"}>
                    Delete
                  </Button>
                </SheetClose>
              )}
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

export default CreateTaskForm;
