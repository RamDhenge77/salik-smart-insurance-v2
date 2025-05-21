import { useEffect, useState } from "react";
import { Vehicle } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  VEHICLE_MAKES,
  VEHICLE_COLORS,
  INSURANCE_PROVIDERS,
} from "@/utils/profileUtils";
import { Car, Plus, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface VehicleFormProps {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
}

export const VehicleForm = ({
  vehicles,
  addVehicle,
  updateVehicle,
  removeVehicle,
}: VehicleFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    id: "1",
    make: "",
    model: "GX 460",
    year: "2015",
    color: "Grey",
    registrationNumber: "FC1909",
    chassisNumber: "",
    plateCode: "LF-FC",
    plateNumber: "B60828",
    rtaTagNumber: "",
    insurance: {
      provider: "",
      policyNumber: "",
      expiryDate: "",
    },
  });

  useEffect(() => {
    if (vehicles.length === 0) {
      addVehicle({
        id: "1",
        make: "",
        model: "GX 460",
        year: "2015",
        color: "Grey",
        registrationNumber: "FC1909",
        chassisNumber: "",
        plateCode: "LF-FC",
        plateNumber: "B60828",
        rtaTagNumber: "",
        insurance: {
          provider: "",
          policyNumber: "",
          expiryDate: "",
        },
      });
    }
  }, []);

  const handleAddVehicle = () => {
    // Generate a unique ID
    const vehicleWithId = {
      ...newVehicle,
      id: Date.now().toString(),
    };

    addVehicle(vehicleWithId);

    // Reset form
    setNewVehicle({
      id: "",
      make: "",
      model: "",
      year: "",
      color: "",
      registrationNumber: "",
      chassisNumber: "",
      plateCode: "",
      plateNumber: "",
      rtaTagNumber: "",
      insurance: {
        provider: "",
        policyNumber: "",
        expiryDate: "",
      },
    });

    setIsDialogOpen(false);
  };

  const handleEditVehicle = () => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, editingVehicle);
      setEditingVehicle(null);
      setIsDialogOpen(false);
    }
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle({ ...vehicle });
    setIsDialogOpen(true);
  };

  const updateNewVehicleField = (field: keyof Vehicle, value: string) => {
    setNewVehicle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNewVehicleInsurance = (
    field: keyof Vehicle["insurance"],
    value: string
  ) => {
    setNewVehicle((prev) => ({
      ...prev,
      insurance: {
        ...prev.insurance,
        [field]: value,
      },
    }));
  };

  const updateEditingVehicleField = (field: keyof Vehicle, value: string) => {
    if (editingVehicle) {
      setEditingVehicle((prev) => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const updateEditingVehicleInsurance = (
    field: keyof Vehicle["insurance"],
    value: string
  ) => {
    if (editingVehicle) {
      setEditingVehicle((prev) => ({
        ...prev!,
        insurance: {
          ...prev!.insurance,
          [field]: value,
        },
      }));
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-uae-primary text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car size={20} />
            <CardTitle className="text-lg text-white">Vehicles</CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-white text-uae-primary hover:bg-uae-accent hover:text-white border-none"
                onClick={() => {
                  setEditingVehicle(null);
                }}
              >
                <Plus size={16} className="mr-1" /> Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? "Edit Vehicle Details" : "Add New Vehicle"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto px-2 py-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Select
                    value={
                      editingVehicle ? editingVehicle.make : newVehicle.make
                    }
                    onValueChange={(value) =>
                      editingVehicle
                        ? updateEditingVehicleField("make", value)
                        : updateNewVehicleField("make", value)
                    }
                  >
                    <SelectTrigger id="make">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {VEHICLE_MAKES.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={
                      editingVehicle ? editingVehicle.model : newVehicle.model
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField("model", e.target.value)
                        : updateNewVehicleField("model", e.target.value)
                    }
                    placeholder="e.g., Camry, Patrol"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={
                      editingVehicle ? editingVehicle.year : newVehicle.year
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField("year", e.target.value)
                        : updateNewVehicleField("year", e.target.value)
                    }
                    placeholder="e.g., 2022"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={
                      editingVehicle ? editingVehicle.color : newVehicle.color
                    }
                    onValueChange={(value) =>
                      editingVehicle
                        ? updateEditingVehicleField("color", value)
                        : updateNewVehicleField("color", value)
                    }
                  >
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {VEHICLE_COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    value={
                      editingVehicle
                        ? editingVehicle.registrationNumber
                        : newVehicle.registrationNumber
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField(
                            "registrationNumber",
                            e.target.value
                          )
                        : updateNewVehicleField(
                            "registrationNumber",
                            e.target.value
                          )
                    }
                    placeholder="e.g., 12345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chassisNumber">Chassis Number</Label>
                  <Input
                    id="chassisNumber"
                    value={
                      editingVehicle
                        ? editingVehicle.chassisNumber
                        : newVehicle.chassisNumber
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField(
                            "chassisNumber",
                            e.target.value
                          )
                        : updateNewVehicleField("chassisNumber", e.target.value)
                    }
                    placeholder="e.g., JN1TNAV36U0020800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plateCode">Plate Code</Label>
                  <Input
                    id="plateCode"
                    value={
                      editingVehicle
                        ? editingVehicle.plateCode
                        : newVehicle.plateCode
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField("plateCode", e.target.value)
                        : updateNewVehicleField("plateCode", e.target.value)
                    }
                    placeholder="e.g., A, B, S"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Plate Number</Label>
                  <Input
                    id="plateNumber"
                    value={
                      editingVehicle
                        ? editingVehicle.plateNumber
                        : newVehicle.plateNumber
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField(
                            "plateNumber",
                            e.target.value
                          )
                        : updateNewVehicleField("plateNumber", e.target.value)
                    }
                    placeholder="e.g., 12345"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rtaTagNumber">RTA Tag Number</Label>
                  <Input
                    id="rtaTagNumber"
                    value={
                      editingVehicle
                        ? editingVehicle.rtaTagNumber
                        : newVehicle.rtaTagNumber
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleField(
                            "rtaTagNumber",
                            e.target.value
                          )
                        : updateNewVehicleField("rtaTagNumber", e.target.value)
                    }
                    placeholder="e.g., 123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Select
                    value={
                      editingVehicle
                        ? editingVehicle.insurance.provider
                        : newVehicle.insurance.provider
                    }
                    onValueChange={(value) =>
                      editingVehicle
                        ? updateEditingVehicleInsurance("provider", value)
                        : updateNewVehicleInsurance("provider", value)
                    }
                  >
                    <SelectTrigger id="insuranceProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSURANCE_PROVIDERS.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    value={
                      editingVehicle
                        ? editingVehicle.insurance.policyNumber
                        : newVehicle.insurance.policyNumber
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleInsurance(
                            "policyNumber",
                            e.target.value
                          )
                        : updateNewVehicleInsurance(
                            "policyNumber",
                            e.target.value
                          )
                    }
                    placeholder="e.g., POL-12345-UAE"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={
                      editingVehicle
                        ? editingVehicle.insurance.expiryDate
                        : newVehicle.insurance.expiryDate
                    }
                    onChange={(e) =>
                      editingVehicle
                        ? updateEditingVehicleInsurance(
                            "expiryDate",
                            e.target.value
                          )
                        : updateNewVehicleInsurance(
                            "expiryDate",
                            e.target.value
                          )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className=""
                  onClick={
                    editingVehicle ? handleEditVehicle : handleAddVehicle
                  }
                >
                  {editingVehicle ? "Update" : "Add"} Vehicle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-uae-primary/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-uae-primary text-lg">
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Color:</span>{" "}
                        {vehicle.color}
                      </p>
                      <p>
                        <span className="font-medium">Plate:</span>{" "}
                        {vehicle.plateCode}-{vehicle.plateNumber}
                      </p>
                      <p>
                        <span className="font-medium">Registration:</span>{" "}
                        {vehicle.registrationNumber}
                      </p>
                      <p>
                        <span className="font-medium">Chassis:</span>{" "}
                        {vehicle.chassisNumber}
                      </p>
                      <p>
                        <span className="font-medium">RTA Tag:</span>{" "}
                        {vehicle.rtaTagNumber}
                      </p>
                    </div>

                    <div className="mt-3">
                      <Badge
                        variant="outline"
                        className="bg-uae-secondary/5 border-uae-secondary/20 text-uae-secondary"
                      >
                        Insurance: {vehicle.insurance.provider}
                      </Badge>
                      <span className="text-xs ml-2 text-gray-500">
                        {vehicle.insurance.policyNumber} (Expires:{" "}
                        {new Date(
                          vehicle.insurance.expiryDate
                        ).toLocaleDateString()}
                        )
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-uae-primary hover:text-uae-secondary hover:bg-uae-secondary/10"
                      onClick={() => openEditDialog(vehicle)}
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeVehicle(vehicle.id)}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Car size={40} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No vehicles added yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Click the "Add Vehicle" button to add your vehicles
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
