import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Props {
  data: ITransaction[];
}

const RecentTransactions = ({ data }: Props) => {
  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 ? (
          data?.map((transaction, index) => (
            <TableRow key={transaction?._id ?? index.toString()}>
              <TableCell>
                <div className="">
                  {formatDateTime(transaction.date).timeOnly}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDateTime(transaction.date).dateOnly}
                </div>
              </TableCell>
              <TableCell className="">{transaction.description}</TableCell>
              <TableCell className="">
                <Badge className={`text-xs font-normal`} variant="outline">
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ₹ {transaction.amount}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
     </>
  );
};

export default RecentTransactions;
