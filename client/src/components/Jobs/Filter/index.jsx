import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  setSalaryMin,
  setSalaryMax,
  setEmploymentType,
  setCity,
  setHomeOffice,
} from "@store/slices/filterSlice";
import { Checkbox } from "@/components/ui/checkbox";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(setSalaryMin(filter.salaryMin || 0));
    dispatch(setSalaryMax(filter.salaryMax || 0));
    dispatch(setEmploymentType(filter.type || ""));
    dispatch(setCity(filter.city || ""));
    dispatch(setHomeOffice(filter.homeOffice || ""));
  }, [
    dispatch,
    filter.salaryMin,
    filter.salaryMax,
    filter.type,
    filter.city,
    filter.homeOffice,
  ]);

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Filters</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Apply filters to refine your job search.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salarymin" className="text-right">
              Salary Minimum
            </Label>
            <Input
              type="number"
              id="salarymin"
              name="salarymin"
              className="col-span-3"
              value={filter.salaryMin || ""}
              onChange={(e) => dispatch(setSalaryMin(parseInt(e.target.value)))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salarymax" className="text-right">
              Salary Maximum
            </Label>
            <Input
              type="number"
              id="salarymax"
              name="salarymax"
              className="col-span-3"
              value={filter.salaryMax || ""}
              onChange={(e) => dispatch(setSalaryMax(parseInt(e.target.value)))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employmentType" className="text-right">
              Employment Type
            </Label>
            <Select
              onValueChange={(t) => dispatch(setEmploymentType(t))}
              className="col-span-3"
              value={filter.type || ""}
            >
              <SelectTrigger
                className="w-full"
                id="employmentType"
                name="employmentType"
              >
                <SelectValue placeholder="Select Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              type="text"
              id="city"
              name="city"
              className="col-span-3"
              value={filter.city || ""}
              onChange={(e) => dispatch(setCity(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ho" className="text-right">
              Home Office
            </Label>
            <Checkbox
              id="ho"
              name="ho"
              className="ml-5"
              checked={filter.homeOffice}
              onCheckedChange={(v) => dispatch(setHomeOffice(v))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleReset} variant="primary">
            Reset
          </Button>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Filter);
