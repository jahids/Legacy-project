import { Button } from '@chakra-ui/react';

const ReplaceButton = ({
    fontWeight,
    loadingText,
    borderRadius,
    bg,
    size,
    w,
    color,
    text,
}: {
    loadingText: string;
    w: string;
    bg: string;
    size: string;
    color: string;
    text: string;
    fontWeight: string;
    borderRadius: string
}) => {
    return (
        <Button
            fontWeight={fontWeight} borderRadius={borderRadius}
            w={w} loadingText={loadingText} size={size} bg={bg} color={color}>
            {text}
        </Button>
    );
};
export default ReplaceButton;
