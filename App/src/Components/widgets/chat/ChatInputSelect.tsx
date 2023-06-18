import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import { Chip, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { TChatbotAnswer } from "../../../types/TChatbot";
import styles from "./ChatInputSelect.module.css";

interface ChatInputSelectProps {
    options: TChatbotAnswer[];
    isMultiSelect?: boolean;
    onSubmit: (values: TChatbotAnswer[]) => void;
}
export const ChatInputSelect: FC<ChatInputSelectProps> = ({ onSubmit, options, isMultiSelect }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const handleClick = (value: string) => {
        if (isMultiSelect) {
            if (selectedValues.includes(value)) {
                setSelectedValues(selectedValues.filter(v => v !== value));
            } else {
                setSelectedValues([...selectedValues, value]);
            }
        } else {
            setSelectedValues([value]);
        }
    };

    const handleSubmit = () => {
        onSubmit(options.filter(o => selectedValues.includes(o.code)));
    };

    return (
        <div className={styles.choices}>
            {options.map((choice, i: any) => {
                const isSelected = selectedValues.includes(choice.code);
                return (
                    <Chip
                        key={choice.code}
                        label={choice.text}
                        color="primary"
                        variant={isSelected ? "filled" : "outlined"}
                        icon={isSelected ? <DoneIcon fontSize="small" /> : undefined}
                        onClick={e => handleClick(choice.code)}
                    />
                );
            })}
            <IconButton color="primary" edge="end" onClick={handleSubmit}>
                <SendIcon />
            </IconButton>
        </div>
    );
};
