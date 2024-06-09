import React, { useState } from "react";
import { toast } from "sonner";

//user defined
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTransactionService from "@/hooks/useTransactionService";
import useWalletService from "@/hooks/useWalletService";
import { TRANSACTION_TYPE_OPTIONS } from "@/lib/constants";
import useAppStore from "@/store";
import { CreateTransactionSchema } from "@/validations/wallet.validation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const CreateTransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("CREDIT");
  const { createTranscation, loading, getTranscations } = useTransactionService();
  const {getMyWallet  } = useWalletService();
  const { currentWallet } = useAppStore();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentWallet?._id) return;
    const result = CreateTransactionSchema({ description, amount, type});

    if (!result.status) {
      return toast.error("Invalid data", {
        description: result?.message?.toString() ?? "Invalid data",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        duration: 2000,
      });
    }
    const modifiedAmount = type === "DEBIT" ? -amount : amount;
      createTranscation(currentWallet?._id, modifiedAmount, description).then((res) => {
        getMyWallet(currentWallet?._id);
        getTranscations({ id: currentWallet?._id, limit: 3, skip: 0, date: -1 });
        setAmount(0);
        setDescription("");
        setType("CREDIT");
    });
  };
  return (
    <>
      <Card className="w-full h-full ">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Create Transaction</CardTitle>
          <CardDescription>
            Make a transaction from your wallet.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={type}
                    required
                    onValueChange={(e) => setType(e)}
                  >
                    <SelectTrigger className="w-full min-w-[120px] justify-between">
                      <SelectValue placeholder="CREDIT" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS?.map((opt, index) => {
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
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    className="w-full"
                    placeholder="456.23"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Cab"
                  className="w-full "
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <Button disabled={loading} type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateTransactionForm;
