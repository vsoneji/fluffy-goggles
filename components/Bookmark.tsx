import { BookmarkType } from '@/types/schema';

interface IBookmarkProps extends BookmarkType {}

export const Bookmark: React.FunctionComponent<IBookmarkProps> = props => {
    return (
        <li>
            <a href={props.url} target="_blank" rel="noreferrer noopener">
                {props.label}
            </a>
        </li>
    );
};
