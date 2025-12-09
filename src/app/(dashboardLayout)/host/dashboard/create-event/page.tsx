"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  DollarSign,
  ImageIcon,
  Info,
  MapPin,
  Ticket,
  Upload,
  Users,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
}

// Event categories available for selection
const EVENT_CATEGORIES = [
  { value: "music", label: "Music" },
  { value: "sports", label: "Sports" },
  { value: "gaming", label: "Gaming" },
  { value: "art", label: "Art & Culture" },
  { value: "travel", label: "Travel" },
  { value: "tech", label: "Technology" },
  { value: "food", label: "Food & Drink" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "fitness", label: "Fitness & Health" },
  { value: "charity", label: "Charity" },
  { value: "networking", label: "Networking" },
] as const;

// Event status options
const EVENT_STATUS = [
  { value: "OPEN", label: "Open" },
  { value: "CLOSED", label: "Closed" },
  { value: "CANCELLED", label: "Cancelled" },
] as const;

// ============================================================================
// SERVER ACTION - Handles form submission
// ============================================================================

async function createEventAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const eventDate = formData.get("eventDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const ticketPrice = parseFloat(formData.get("ticketPrice") as string) || 0;
  const totalSeats = parseInt(formData.get("totalSeats") as string) || 0;
  const availableSeats = parseInt(formData.get("availableSeats") as string) || 0;
  const category = formData.get("category") as string;
  const status = formData.get("status") as string;
  const bannerImage = formData.get("bannerImage") as string;

  const errors: Record<string, string[]> = {};

  if (!title || title.trim().length < 3) {
    errors.title = ["Title must be at least 3 characters long"];
  }

  if (!description || description.trim().length < 10) {
    errors.description = ["Description must be at least 10 characters long"];
  }

  if (!location || location.trim().length < 3) {
    errors.location = ["Location is required"];
  }

  if (!eventDate) {
    errors.eventDate = ["Event date is required"];
  }

  if (!startTime) {
    errors.startTime = ["Start time is required"];
  }

  if (!endTime) {
    errors.endTime = ["End time is required"];
  }

  if (startTime && endTime && startTime >= endTime) {
    errors.endTime = ["End time must be after start time"];
  }

  if (ticketPrice < 0) {
    errors.ticketPrice = ["Ticket price cannot be negative"];
  }

  if (totalSeats < 1) {
    errors.totalSeats = ["Total seats must be at least 1"];
  }

  if (availableSeats < 0) {
    errors.availableSeats = ["Available seats cannot be negative"];
  }

  if (availableSeats > totalSeats) {
    errors.availableSeats = ["Available seats cannot exceed total seats"];
  }

  if (!category) {
    errors.category = ["Please select a category"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors,
    };
  }

  console.log("Creating event:", {
    title,
    description,
    location,
    eventDate,
    startTime,
    endTime,
    ticketPrice,
    totalSeats,
    availableSeats,
    category,
    status,
    bannerImage,
    hostId: "demo-host-id",
  });

  return {
    success: true,
    message: "Event created successfully!",
    errors: {},
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CreateEventPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createEventAction, {
    success: false,
    message: "",
    errors: {},
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("OPEN");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard/host/events");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFieldError = (field: string): string | null => {
    return state.errors[field]?.[0] || null;
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

      <div className="flex-1 overflow-auto">
        <div className="">
          <div className="mb-8">

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Create New Event
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Fill in the details below to create your event
            </p>
          </div>

          {state.message && (
            <div
              className={cn(
                "mb-6 p-4 rounded-lg border",
                state.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-700"
              )}
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                <span className="font-medium">{state.message}</span>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-8">
            <input
              type="hidden"
              name="eventDate"
              value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
            />
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="status" value={status} />
            <input type="hidden" name="bannerImage" value={imagePreview || ""} />

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <Info className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 text-xl">
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Essential details about your event
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700 font-medium">
                    Event Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Summer Music Festival 2024"
                    className={cn(
                      "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 h-12",
                      getFieldError("title") &&
                      "border-red-500 focus:border-red-500"
                    )}
                    disabled={isPending}
                    aria-invalid={!!getFieldError("title")}
                    aria-describedby="title-error"
                  />
                  {getFieldError("title") && (
                    <p id="title-error" className="text-red-500 text-sm">
                      {getFieldError("title")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-slate-700 font-medium"
                  >
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event in detail..."
                    rows={5}
                    className={cn(
                      "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none",
                      getFieldError("description") &&
                      "border-red-500 focus:border-red-500"
                    )}
                    disabled={isPending}
                    aria-invalid={!!getFieldError("description")}
                    aria-describedby="description-error"
                  />
                  {getFieldError("description") && (
                    <p id="description-error" className="text-red-500 text-sm">
                      {getFieldError("description")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        className={cn(
                          "bg-white border-slate-300 text-slate-900 h-12 w-full",
                          !category && "text-slate-400",
                          getFieldError("category") && "border-red-500"
                        )}
                        aria-invalid={!!getFieldError("category")}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        {EVENT_CATEGORIES.map((cat) => (
                          <SelectItem
                            key={cat.value}
                            value={cat.value}
                            className="text-slate-900 hover:bg-slate-100 focus:bg-slate-100"
                          >
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getFieldError("category") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("category")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Event Status
                    </Label>
                    <Select
                      value={status}
                      onValueChange={setStatus}
                      disabled={isPending}
                    >
                      <SelectTrigger className="bg-white border-slate-300 text-slate-900 h-12 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        {EVENT_STATUS.map((s) => (
                          <SelectItem
                            key={s.value}
                            value={s.value}
                            className="text-slate-900 hover:bg-slate-100 focus:bg-slate-100"
                          >
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <CalendarIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 text-xl">
                      Schedule & Location
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      When and where your event takes place
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-slate-700 font-medium"
                  >
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Madison Square Garden, New York"
                    className={cn(
                      "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 h-12",
                      getFieldError("location") &&
                      "border-red-500 focus:border-red-500"
                    )}
                    disabled={isPending}
                    aria-invalid={!!getFieldError("location")}
                    aria-describedby="location-error"
                  />
                  {getFieldError("location") && (
                    <p id="location-error" className="text-red-500 text-sm">
                      {getFieldError("location")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Event Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={isPending}
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:text-slate-900",
                            !selectedDate && "text-slate-400",
                            getFieldError("eventDate") && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white border-slate-200"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="bg-white text-slate-900"
                        />
                      </PopoverContent>
                    </Popover>
                    {getFieldError("eventDate") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("eventDate")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="startTime"
                      className="text-slate-700 font-medium"
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      Start Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      className={cn(
                        "bg-white border-slate-300 text-slate-900 h-12",
                        getFieldError("startTime") &&
                        "border-red-500 focus:border-red-500"
                      )}
                      disabled={isPending}
                      aria-invalid={!!getFieldError("startTime")}
                    />
                    {getFieldError("startTime") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("startTime")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="endTime"
                      className="text-slate-700 font-medium"
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      End Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      className={cn(
                        "bg-white border-slate-300 text-slate-900 h-12",
                        getFieldError("endTime") &&
                        "border-red-500 focus:border-red-500"
                      )}
                      disabled={isPending}
                      aria-invalid={!!getFieldError("endTime")}
                    />
                    {getFieldError("endTime") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("endTime")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50">
                    <Ticket className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 text-xl">
                      Ticketing
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Pricing and capacity settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="ticketPrice"
                      className="text-slate-700 font-medium"
                    >
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Ticket Price ($)
                    </Label>
                    <Input
                      id="ticketPrice"
                      name="ticketPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue="0"
                      placeholder="0.00"
                      className={cn(
                        "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12",
                        getFieldError("ticketPrice") &&
                        "border-red-500 focus:border-red-500"
                      )}
                      disabled={isPending}
                      aria-invalid={!!getFieldError("ticketPrice")}
                    />
                    <p className="text-xs text-slate-500">
                      Set to 0 for free events
                    </p>
                    {getFieldError("ticketPrice") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("ticketPrice")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="totalSeats"
                      className="text-slate-700 font-medium"
                    >
                      <Users className="w-4 h-4 inline mr-2" />
                      Total Seats <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="totalSeats"
                      name="totalSeats"
                      type="number"
                      min="1"
                      defaultValue="100"
                      placeholder="100"
                      className={cn(
                        "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12",
                        getFieldError("totalSeats") &&
                        "border-red-500 focus:border-red-500"
                      )}
                      disabled={isPending}
                      aria-invalid={!!getFieldError("totalSeats")}
                    />
                    {getFieldError("totalSeats") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("totalSeats")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="availableSeats"
                      className="text-slate-700 font-medium"
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Available Seats
                    </Label>
                    <Input
                      id="availableSeats"
                      name="availableSeats"
                      type="number"
                      min="0"
                      defaultValue="100"
                      placeholder="100"
                      className={cn(
                        "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12",
                        getFieldError("availableSeats") &&
                        "border-red-500 focus:border-red-500"
                      )}
                      disabled={isPending}
                      aria-invalid={!!getFieldError("availableSeats")}
                    />
                    <p className="text-xs text-slate-500">
                      Usually equals total seats initially
                    </p>
                    {getFieldError("availableSeats") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError("availableSeats")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 text-xl">Media</CardTitle>
                    <CardDescription className="text-slate-500">
                      Upload a banner image for your event
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-slate-700 font-medium">
                    Banner Image
                  </Label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isPending}
                  />

                  {imagePreview ? (
                    <div className="relative group">
                      <div className="relative aspect-video w-full max-w-2xl rounded-xl overflow-hidden border border-slate-200">
                        <Image
                        width={500}
                        height={500}
                          src={imagePreview}
                          alt="Event banner preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={triggerFileInput}
                            disabled={isPending}
                            className="bg-white/90 hover:bg-white text-slate-900 border-0"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Change
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={clearImage}
                            disabled={isPending}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">
                        Hover over the image to change or remove
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className={cn(
                        "border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer transition-all",
                        "hover:border-purple-400 hover:bg-purple-50",
                        isPending && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-purple-100">
                          <Upload className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-slate-900 font-medium">
                            Click to upload banner image
                          </p>
                          <p className="text-slate-500 text-sm mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 h-14 font-semibold text-lg shadow-lg shadow-indigo-500/25"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5 mr-2" />
                    Create Event
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
                className="sm:w-40 h-14 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}