"use client"
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus, X, Save, Eye } from "lucide-react";
import { useState } from "react";

export default function CreateEvent() {
  const [date, setDate] = useState<Date>();
  const [isFree, setIsFree] = useState(false);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [speakers, setSpeakers] = useState([{ name: "", title: "", image: "" }]);

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const addSpeaker = () => setSpeakers([...speakers, { name: "", title: "", image: "" }]);
  const removeSpeaker = (index: number) => setSpeakers(speakers.filter((_, i) => i !== index));

  return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Create New Event</h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details to create your event
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Basic Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Event Banner</h2>

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Drag and drop an image, or{" "}
                <span className="text-primary font-medium">browse</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Recommended: 1200x600px, JPG or PNG
              </p>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Date, Time & Location</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Start Time *</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <Label>End Time *</Label>
                  <Input type="time" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="venue">Venue / Location *</Label>
                <Input id="venue" placeholder="Enter venue name and address" />
              </div>
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Pricing & Capacity</h2>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Free Event</p>
                <p className="text-sm text-muted-foreground">
                  Toggle on if this event is free to attend
                </p>
              </div>
              <Switch checked={isFree} onCheckedChange={setIsFree} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!isFree && (
                <div className="space-y-2">
                  <Label htmlFor="price">Ticket Price ($) *</Label>
                  <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="capacity">Maximum Capacity *</Label>
                <Input id="capacity" type="number" placeholder="100" min="1" />
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Speakers (Optional)</h2>
              <Button variant="outline" size="sm" onClick={addSpeaker} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Speaker
              </Button>
            </div>

            <div className="space-y-4">
              {speakers.map((_, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Speaker name" />
                    <Input placeholder="Title / Role" />
                  </div>
                  {speakers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeSpeaker(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">FAQs (Optional)</h2>
              <Button variant="outline" size="sm" onClick={addFaq} className="gap-2">
                <Plus className="h-4 w-4" />
                Add FAQ
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((_, index) => (
                <div key={index} className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Question" />
                      <Textarea placeholder="Answer" rows={2} />
                    </div>
                    {faqs.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeFaq(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" className="sm:w-auto">
              Save as Draft
            </Button>
            <Button className="btn-primary sm:w-auto">
              Publish Event
            </Button>
          </div>
        </div>
      </div>
  );
}
