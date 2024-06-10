import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

//user defined
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import useTaskService from "@/hooks/useTaskService";
import { PRIORITY_TYPE_OPTIONS } from "@/lib/constants";
import { cn, formatDateTime } from "@/lib/utils";
import useAppStore from "@/store";
import {
  CreateTaskValidator,
  TCreateTaskValidator,
  createTaskIntialValues,
} from "@/validations/auth-validation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm<TCreateTaskValidator>({
    resolver: zodResolver(CreateTaskValidator),
    defaultValues:
      actionType === "Edit" && data
        ? {
            title: data?.title,
            description: data?.description,
            priority: data?.priority,
            dueDate: new Date(data?.dueDate) ?? new Date(),
            listId: data?.listId,
          }
        : { ...createTaskIntialValues, listId: lists?.[0]?._id },
  });

  const onSubmit = async (values: TCreateTaskValidator) => {
    console.log("submut", values);
    createTask(
      values.title,
      values.priority,
      values.description,
      values.dueDate,
      values.listId
    ).then(() => {
      setSheetOpen(false);
      form.reset();
      form.clearErrors();
    });
  };

  const onDelete = async (values: ITask) => {
    console.log("onDelete", values);
    deleteTask(values?._id as string).then(() => {
      setSheetOpen(false);
      form.reset();
      form.clearErrors();
    });
  };

  const onUpdate = async (values: TCreateTaskValidator) => {
    console.log("onUpdate", values);
    if (!data) return;
    const result = { ...data, ...values };
    console.log("onUpdaterrr", result);
    updateTask(data?._id as string, result).then(() => {
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
                      onValueChange={(e: "low" | "medium" | "high") =>
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
                      name="listId"
                      value={field.value}
                      onValueChange={(e: string) => field.onChange(e)}
                    >
                      <SelectTrigger className="w-full min-w-[120px] justify-between">
                        <SelectValue placeholder={"Select"} />
                      </SelectTrigger>
                      <SelectContent>
                        {lists?.map((opt, index) => {
                          return (
                            <SelectItem
                              key={index?.toString()}
                              value={opt?._id as any}
                              disabled={
                                actionType === "Create" && index !== 0
                                  ? true
                                  : false
                              }
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
                          date < new Date() || date < new Date("1900-01-01")
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
              <Button
                className=""
                type="button"
                onClick={() => setSheetOpen(false)}
                variant={"ghost"}
              >
                cancel
              </Button>
              {actionType === "Edit" && data?._id && (
                <Button
                  className=""
                  type="button"
                  onClick={() => onDelete(data)}
                  variant={"destructive"}
                  disabled={loading}
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

export default CreateTaskForm;
