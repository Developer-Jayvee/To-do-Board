import type { ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputHanlderProps<T> {
    setState : Dispatch<SetStateAction<T>>;
}
export default function useInputHandler<T>({
    setState
} : InputHanlderProps<T>){
    
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name , value } = e.target;
        
        setState(
            (prev) => ({
                ...prev,
                [name] : value
            })
        );
    }

    return { handleInput }
}