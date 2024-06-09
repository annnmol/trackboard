import { Button } from "@/components/ui/button";
import useAppStore from "@/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

//user defined components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateTransactionForm from "@/components/wallet/create-transaction-form";
import DashboardCards from "@/components/wallet/dashboard-cards";
import RecentTransactions from "@/components/wallet/recent-transactions";
import useTransactionService from "@/hooks/useTransactionService";
import { formatDateTime } from "@/lib/utils";

const HomeScreen = () => {
  const { getTranscations } = useTransactionService();
  const { authSession, transactions, setTransactions, currentWallet } =
    useAppStore();

  useEffect(() => {
    if (authSession) {
      getTranscations({ id: authSession, limit: 3, skip: 0, date: -1 });
    }
    return () => {
      setTransactions([]);
    };
  }, [authSession]);

  const DASHBOARD_CARDS_DATA = [
    {
      title: "Name",
      value: currentWallet?.name ?? "",
      percentage: "Wallet Name",
      icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Status",
      value: "Active",
      percentage: "KYC Verified",
      icon: <Fingerprint className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Balance",
      value: "₹ " + currentWallet?.balance,
      percentage: "+17.8% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Last Transaction",
      value: "₹ " + transactions?.[0]?.amount,
      percentage: formatDateTime(transactions?.[0]?.date).dateTime,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-12 p-4 overflow-y-auto">
        <div className="w-full md:w-[60%] flex flex-col gap-16">
          <div className="flex flex-row justify-evenly items-center gap-12 flex-wrap">
            <DashboardCards data={DASHBOARD_CARDS_DATA} />
          </div>
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your wallet.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to={`/transactions/${currentWallet?._id}?skip=0&limit=6&date=-1&amount=0`}>
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <RecentTransactions data={transactions} />
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-[35%] flex justify-center items-center gap-8">
          <CreateTransactionForm />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
