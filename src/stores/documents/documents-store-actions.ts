import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { DocumentStore } from 'src/view/view';

export type DocumentsStoreAction =
    | SetClipboard
    | DeleteDocument
    | UpdateDocumentPath
    | AddDocument
    | ActiveLineageViewChange
    | WorkspaceEvents;

export type SetClipboard = {
    type: 'DOCUMENTS/SET_CLIPBOARD';
    payload: {
        branch: ClipboardBranch;
    };
};
export type AddDocument = {
    type: 'DOCUMENTS/ADD_DOCUMENT';
    payload: {
        path: string;
        documentStore: DocumentStore;
        viewId: string;
    };
};
export type DeleteDocument = {
    type: 'DOCUMENTS/DELETE_DOCUMENT';
    payload: {
        path: string;
    };
};

export type UpdateDocumentPath = {
    type: 'DOCUMENTS/UPDATE_DOCUMENT_PATH';
    payload: {
        oldPath: string;
        newPath: string;
    };
};

export type WorkspaceEvents =
    | ActiveLineageViewChange
    | ActiveLeafChange
    | WorkspaceResize;

export type ActiveLineageViewChange = {
    type: 'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW';
    payload: {
        path: string;
        viewId: string;
    };
};

export type ActiveLeafChange = {
    type: 'WORKSPACE/ACTIVE_LEAF_CHANGE';
};

export type WorkspaceResize = {
    type: 'WORKSPACE/RESIZE';
};
