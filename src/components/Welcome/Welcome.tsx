
import { UserResponse } from "@/models/users.model";
import { Notification } from "@mantine/core";

export default function Welcome({ user }: { user: UserResponse }) {
    return (
        <Notification
            title={"Welcome, " + user.username + "!"}
            withCloseButton={false}
        >
            Start your new journey with NeverFear today and experience the ultimate 
        </Notification>
    );
};