/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/src/lib/utils";

interface InputFieldErrorProps {
    field: string;
    state: any;
    className?: string;
}

const InputFieldError = ({ field, state, className }: InputFieldErrorProps) => {
    if (!state?.errors?.[field]?.length) return null;

    return (
        <div className={cn("text-red-500 text-sm mt-1", className)}>
            {state.errors[field][0]}
        </div>
    );
};

export default InputFieldError;