import { useState } from "react";
import styles from './Sidebar.module.css';

interface Note {
    id: string;
    title: string;
}

interface Doc {
    id: string;
    title: string;
}

interface Folder {
    id: string;
    name: string;
    files: {id: string; title: string; type: 'note' | 'doc'}[];
}

interface SlidebarProps {
    spaceName?: string;
    starredDocs?: Doc[];
    starredNotes?: Note[];
    folders?: Folder[];
    activePage?: string;
    onNavigate: (page: string) => void;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
        className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        width="12" height="12" viewBox="0 0 12 12" fill="none"
    >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DocIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const NoteIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 3.5C2 2.67 2.67 2 3.5 2h7C11.33 2 12 2.67 12 3.5v5.79a1.5 1.5 0 01-.44 1.06l-2.21 2.21A1.5 1.5 0 018.29 13H3.5A1.5 1.5 0 012 11.5v-8z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 12.8V10a1 1 0 011-1h2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4.5 5.5h5M4.5 7.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const TaskIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="5" cy="8.5" r="0.8" fill="currentColor"/>
        <circle cx="7" cy="8.5" r="0.8" fill="currentColor"/>
        <circle cx="9" cy="8.5" r="0.8" fill="currentColor"/>
  </svg>
);

const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2l1.35 2.73L11.5 5.27l-2.25 2.19.53 3.09L7 9l-2.78 1.55.53-3.09L2.5 5.27l3.15-.54L7 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

const FolderIcon = ({ open }: { open?: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d={open
        ? "M2 5.5A1.5 1.5 0 013.5 4h2.17l1 1H10.5A1.5 1.5 0 0112 6.5v4A1.5 1.5 0 0110.5 12h-7A1.5 1.5 0 012 10.5v-5z"
        : "M2 4.5A1.5 1.5 0 013.5 3h2.17l1 1H10.5A1.5 1.5 0 0112 5.5v5A1.5 1.5 0 0110.5 12h-7A1.5 1.5 0 012 10.5v-6z"}
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 2.5v8M2.5 6.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FileIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M3 1.5h5l2.5 2.5V11a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M7.5 1.5V4H10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

export default function Sidebar({
    spaceName = "Rei's Space",
    starredDocs = [{ id: '1', title: 'Project Brief' }, { id: '2', title: 'Meeting Notes' }, { id: '3', title: 'Shopping List' }],
    starredNotes = [{ id: '1', title: 'Ideas dump' }, { id: '2', title: 'Weekly review' }],
    folders = [
    { id: '1', name: 'Work', files: [{ id: 'f1', title: 'Sales Report', type: 'doc' }, { id: 'f2', title: 'Action items', type: 'note' }] },
    { id: '2', name: 'Personal', files: [{ id: 'f3', title: 'Bucket list', type: 'note' }] }],
    activePage = 'notes',
    onNavigate = () => {},
}: SlidebarProps) {
    const [starredOpen, setStarredOpen] = useState(true);
    const [foldersOpen, setFoldersOpen] = useState(true);
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ '1': true});

    const toggleFolder = (id: string) => setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));

    const navItems = [
        {id: 'docs', label: 'All Docs', icon: <DocIcon />},
        {id: 'tasks', label: 'Tasks', icon: <TaskIcon />},
        {id: 'notes', label: 'Notes', icon: <NoteIcon />},
        {id: 'calendar', label: 'Calendar', icon: <CalendarIcon />},
    ];

    return (
        <nav className={styles.sidebar}>
            {/* Section 1 - Space name*/}
            <div className={styles.spaceHeader}>
                <div className={styles.spaceAvatar}>
                    {spaceName.charAt(0)}
                </div>
                <span className={styles.spaceName}>{spaceName}</span>
            </div>

            {/* Section 2 - Main nav */}
            <ul className={styles.navList}>
                {navItems.map(item => (
                    <li key={item.id}>
                        <button
                            className={`${styles.navItem} ${activePage === item.id ? styles.navItemActive : ''}`}
                            onClick={() => onNavigate(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.divider}/>

            {/* Section 3 - Starred */}
            <div className={styles.section}>
                <button className={styles.sectionHeader} onClick={() => setStarredOpen(o => !o)}>
                    <span className={styles.navIcon}><StarIcon /></span>
                    <span className={styles.sectionLabel}>Starred</span>
                    <ChevronIcon open={starredOpen} />
                </button>
                {starredOpen && (
                    <ul className={styles.subList}>
                        {starredDocs.map(doc => (
                            <li key={doc.id}>
                                <button className={styles.subItem} onClick={() => onNavigate(`doc-${doc.id}`)}>
                                    <span className={styles.subIcon}><DocIcon /></span>
                                    {doc.title}
                                </button>
                            </li>
                        ))}
                        {starredNotes.map(note => (
                            <li key={note.id}>
                                <button className={styles.subItem} onClick={() => onNavigate(`note-${note.id}`)}>
                                    <span className={styles.subIcon}><NoteIcon /></span>
                                    {note.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={styles.divider} />

            {/* Section 4 - Folders */}
            <div className={styles.section}>
                <div className={styles.sectionHeaderRow}>
                    <button className={styles.sectionHeader} onClick={() => setFoldersOpen(o => !o)}>
                        <span className={styles.navIcon}><FolderIcon open={foldersOpen} /></span>
                        <span className={styles.sectionLabel}>Folders</span>
                        <ChevronIcon open={foldersOpen} />
                    </button>
                    <button className={styles.addBtn} title="New folder">
                        <PlusIcon />
                    </button>
                </div>

                {foldersOpen && (
                    <ul className={styles.subList}>
                        {folders.map(folder => (
                            <li key={folder.id}>
                                <button
                                className={styles.subItem}
                                onClick={() => toggleFolder(folder.id)}
                                >
                                    <span className={styles.subIcon}>
                                        <FolderIcon open={openFolders[folder.id]} />
                                    </span>
                                    {folder.name}
                                    <ChevronIcon open={!!openFolders[folder.id]} />
                                </button>
                                {openFolders[folder.id] && (
                                    <ul className={styles.fileList}>
                                        {folder.files.map(file => (
                                            <li key={file.id}>
                                                <button
                                                className={styles.fileItem}
                                                onClick={() => onNavigate(`file-${file.id}`)}
                                                >
                                                    <span className={styles.subIcon}><FileIcon /></span>
                                                    {file.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}