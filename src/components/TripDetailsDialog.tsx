import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TripData } from "./FileUploader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface TripDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trips: TripData[];
  title: string;
  breakdowns?: { label: string; value: string | number }[];
}

const TripDetailsDialog: React.FC<TripDetailsDialogProps> = ({
  open,
  onOpenChange,
  trips,
  title,
  breakdowns,
}) => {
  const { toast } = useToast();
  // console.log("TripDetailsDialog trips:", trips);
  // console.log("TripDetailsDialog breakdowns:", breakdowns);

  React.useEffect(() => {
    if (
      open &&
      trips.length === 0 &&
      (!breakdowns || breakdowns.length === 0)
    ) {
      toast({
        title: "No data available",
        description:
          "There is no detailed information to display for this category.",
        variant: "destructive",
      });
    }
  }, [open, trips, breakdowns, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {trips.length > 0
              ? `Showing ${trips.length} trips for this category`
              : breakdowns && breakdowns.length > 0
              ? "Detailed breakdown analysis"
              : "No data available for this category"}
          </DialogDescription>
        </DialogHeader>

        {trips.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Toll Gate</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Amount (AED)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips?.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>{trip.trip_date}</TableCell>
                  <TableCell>{trip.trip_time}</TableCell>
                  <TableCell>{trip.toll_gate}</TableCell>
                  <TableCell>{trip.direction}</TableCell>
                  <TableCell className="text-right">
                    {trip.amount != null
                      ? Number(trip.amount).toFixed(2)
                      : "--"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : breakdowns && breakdowns.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdowns.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No data available for this category.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TripDetailsDialog;
