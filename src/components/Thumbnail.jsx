import {CardMedia, Stack, Typography, Card} from "@mui/material";
function Thumbnail(props) {
    return(
        <Card>
            <CardMedia
                component={"img"}
                image={props.img}
            />
            <Stack direction="column" spacing={0.5} useFlexGap>
                <Typography>{props.text}</Typography>
            </Stack>
        </Card>
    )
}
export default Thumbnail