import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

export interface Action<T> {
    label: string;
    onClick: (item: T) => void;
    variant?: "default" | "destructive";
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    filters?: {
        key: string;
        label: string;
        options: { value: string; label: string }[];
    }[];
    title?: string;
    description?: string;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    actions,
    searchable = true,
    searchPlaceholder = "Search...",
    filters,
    title,
    description,
}: DataTableProps<T>) {
    return (
        <div className="bg-card rounded-xl border border-border">
            {(title || description) && (
                <div className="p-4 lg:p-6 border-b border-border">
                    {title && <h3 className="font-semibold">{title}</h3>}
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
            )}

            {/* Filters & Search */}
            {(searchable || filters) && (
                <div className="p-4 border-b border-border flex flex-wrap gap-3">
                    {searchable && (
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder={searchPlaceholder} className="pl-9" />
                        </div>
                    )}
                    {filters?.map((filter) => (
                        <Select key={filter.key}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={String(column.key)} className="whitespace-nowrap">
                                    {column.label}
                                </TableHead>
                            ))}
                            {actions && <TableHead className="w-[50px]"></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.key)} className="whitespace-nowrap">
                                        {column.render
                                            ? column.render(item)
                                            : String((item as Record<string, unknown>)[column.key as string] ?? "")}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {actions.map((action, index) => (
                                                    <DropdownMenuItem
                                                        key={index}
                                                        onClick={() => action.onClick(item)}
                                                        className={cn(
                                                            action.variant === "destructive" && "text-destructive"
                                                        )}
                                                    >
                                                        {action.label}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing 1-{Math.min(10, data.length)} of {data.length} results
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
