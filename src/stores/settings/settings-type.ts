import { Hotkey } from 'obsidian';

import { CommandName } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';

export type CustomHotkeys = {
    [command in CommandName]?: {
        primary?: Hotkey;
        secondary?: Hotkey;
    };
};
export type Theme = {
    containerBg?: string;
    activeBranchBg?: string;
};

export type ScrollingMode =
    | 'reveal-active-card'
    | 'reveal-active-card-and-direct-child'
    | 'keep-active-card-at-center'
    | 'fixed-position';
export type ScrollingSettings = {
    horizontalOffset: number;
    verticalOffset: number;
    horizontalScrollingMode: ScrollingMode;
};

export type DocumentBackup = {
    content: string;
    created: number;
};

export type LineageDocumentFormat = 'outline' | 'document';

export type ViewType = 'lineage' | 'markdown';
export type DocumentPreferences = {
    documentFormat: LineageDocumentFormat;
    viewType: ViewType;
};

export type Settings_0_5_4 = Omit<Settings, 'documents'> & {
    documents: Record<string, true | DocumentPreferences>;
};

export type Settings = {
    documents: Record<string, DocumentPreferences>;
    hotkeys: {
        customHotkeys: CustomHotkeys;
    };
    view: {
        fontSize: number;
        theme: Theme;
        cardWidth: number;
        minimumCardHeight?: number;
        scrolling: ScrollingSettings;
        limitPreviewHeight: boolean;
        zoomLevel: number;
    };
    // when view.inlineEditor is enabled, and the file is opened by another markdown view, inlineEditor overrides file.data with card.data
    // a copy of file.data is saved in case obsidian closes while file.data is set tod card.data
    backup: {
        [file_path: string]: DocumentBackup;
    };
};
