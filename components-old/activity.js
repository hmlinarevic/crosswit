import ActivityIcon from "./icons/activity-icon";

export default function Activity() {
    return (
        <div className="flex justify-center text-[#404040]">
            <ActivityIcon className="mr-4" />
            <p>Words Left: 2</p>
        </div>
    );
}
