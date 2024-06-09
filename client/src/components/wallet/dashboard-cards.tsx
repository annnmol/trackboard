import React from "react";
//user defined
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface Props {
  data: {
    title: string;
    value: number | string;
    percentage: string;
    icon: React.ReactNode;
  }[];
}

const DashboardCards = ({ data }: Props) => {
  return (
    <>
      {data?.map((card, index: number) => {
        return (
          <Card key={index?.toString()} className="min-w-[180px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card?.title}
              </CardTitle>
              {card?.icon}
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{card?.value}</div>
              <p className="text-xs text-muted-foreground">
                {card?.percentage}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default DashboardCards;
