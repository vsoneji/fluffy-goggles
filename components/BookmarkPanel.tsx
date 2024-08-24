import { BookmarkPanelType } from '@/types/schema';
import { Bookmark } from './Bookmark';

interface IBookmarkPanelProps extends BookmarkPanelType {
    onChange: (orig: BookmarkPanelType, changed: BookmarkPanelType) => void;
}

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = props => {
    return (
        <div>
            <span className="panelHeading">{props.label}</span>
            <ul className="bookmarkList">
                {props.bookmarks.map((bookmark, i) => {
                    return <Bookmark key={i} {...bookmark} />;
                })}
            </ul>
        </div>
    );
};
