import { useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File } from "lucide-react";

//user defined
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentTransactions from "@/components/wallet/recent-transactions";
import useTransactionService from "@/hooks/useTransactionService";
import { SORT_BY_OPTIONS } from "@/lib/constants";
import useAppStore from "@/store";

const TransactionsScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 6);
  const amount = Number(searchParams.get("amount") ?? 0);
  const date = Number(searchParams.get("date") ?? -1);

  const { getTranscations, exportTranscations, loading } =
    useTransactionService();
  const { transactions, setTransactions } = useAppStore();

  const exportToCSV = () => {
    if (!id) return;
    exportTranscations({ id: id, date: date, amount: amount })
  };

  const navigateWithDefaults = (
    id: string,
    skip: number,
    limit: number,
    amount: number,
    date: number
  ) => {
    // Build the new URL
    const url = `/transactions/${id}?skip=${skip}&limit=${limit}&date=${date}&amount=${amount}`;
    navigate(url);
  };

  const handleFilterSelect = (e: string) => {
    if (!id) return;
    if (e === "1") navigateWithDefaults(id, 0, 6, 0, 1);
    if (e === "2") navigateWithDefaults(id, 0, 6, 0, -1);
    if (e === "3") navigateWithDefaults(id, 0, 6, 1, 0);
    if (e === "4") navigateWithDefaults(id, 0, 6, -1, 0);
  };
  const getCurrentFilterValue = () => {
    if (!id) return;
    if (amount === 1) return "3";
    if (amount === -1) return "4";
    if (date === 1) return "1";
    if (date === -1) return "2";

    return "2";
  };

  useEffect(() => {
    // Check if the parameters are numbers
    if (!id) return;
    if (
      typeof skip === "number" &&
      typeof limit === "number" &&
      typeof amount === "number" &&
      typeof date === "number"
    ) {
      getTranscations({
        id: id,
        skip: skip,
        limit: limit,
        amount: amount,
        date: date,
      });
    } else {
      // If not, navigate to the default URL
      navigateWithDefaults(id, 0, 6, 0, -1);
    }
    return () => {
      setTransactions([]);
    };
  }, [skip, limit, amount, date, id]);

  return (
    <>
      <div className="w-full h-full flex flex-col flex-1 items-start gap-8 p-8">
        <Card className="w-full h-full">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col gap-2 w-[30%]">
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                Manage your all transactions at once.
              </CardDescription>
            </div>
            <div className="flex justify-end gap-8">
              <Select
                value={getCurrentFilterValue()}
                required
                onValueChange={handleFilterSelect}
              >
                <SelectTrigger className="w-full min-w-[150px] justify-between h-[32px]">
                  <SelectValue placeholder="Asc Desc" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_BY_OPTIONS?.map((opt, index) => {
                    return (
                      <SelectItem
                        key={opt?.id ?? index?.toString()}
                        value={opt?.id?.toString()}
                      >
                        {opt?.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {/* </div> */}
              <Button
                disabled={loading}
                onClick={exportToCSV}
                size="sm"
                className="h-8 gap-1"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1">
            <RecentTransactions data={transactions} />
          </CardContent>
          <CardFooter className="flex justify-end gap-8">
            <Pagination>
              <PaginationContent>
                <Button variant={"ghost"} asChild disabled={skip === 0}>
                  <Link
                    to={`/transactions/${id}?skip=${
                      skip - limit > 0 ? skip - limit : 0
                    }&limit=${limit}&date=${date}&amount=${amount}`}
                  >
                    Previous
                  </Link>
                </Button>
                <Button variant={"ghost"} disabled>
                  {skip / limit + 1}
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  disabled={transactions?.length === 0}
                >
                  <Link
                    to={`/transactions/${id}?skip=${
                      skip + limit
                    }&limit=${limit}&date=${date}&amount=${amount}`}
                  >
                    Next
                  </Link>
                </Button>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TransactionsScreen;
