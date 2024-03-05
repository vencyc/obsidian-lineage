import { findSnapshotIndex } from 'src/stores/view/reducers/history/helpers/find-snapshot-index';
import { updateNavigationState } from 'src/stores/view/reducers/history/helpers/update-navigation-state';

import { NodePosition } from 'src/stores/view/helpers/search/find-node-position';
import {
    DocumentHistory,
    DocumentState,
} from 'src/stores/view/view-state-type';
import { createSnapshot } from 'src/stores/view/reducers/history/helpers/create-snapshot';
import { UndoableAction } from 'src/stores/view/helpers/state-events';

const MAX_SNAPSHOTS = 20;

export type AddSnapshotAction = {
    type: 'HISTORY/ADD_SNAPSHOT';
    payload: {
        path: string;
        data: string;
        position: NodePosition | null;
        actionType: string | null;
    };
};

export const addSnapshot = (
    document: DocumentState,
    history: DocumentHistory,
    action: UndoableAction,
) => {
    const snapshots = history.snapshots;

    const activeIndex = history.state.activeIndex;
    const activeSnapshot = snapshots[activeIndex];

    if (snapshots.length > 0 && activeIndex !== snapshots.length - 1) {
        // remove obsolete snapshots (between the active snapshot and the end)
        history.snapshots.splice(activeIndex + 1);
    }

    if (snapshots.length >= MAX_SNAPSHOTS) {
        const numSnapshotsToRemove = snapshots.length - MAX_SNAPSHOTS + 1;
        history.snapshots.splice(0, numSnapshotsToRemove);
        history.state.activeIndex = findSnapshotIndex(
            snapshots,
            activeSnapshot.id,
        );
    }
    if (activeSnapshot && action.type === 'DOCUMENT/LOAD_FILE') {
        const content = JSON.parse(activeSnapshot.data.content);
        const snapshotContent = JSON.stringify(Object.values(content));
        const documentContent = JSON.stringify(Object.values(document.content));
        if (snapshotContent === documentContent) return;
    }

    const snapshot = createSnapshot(document, action);
    snapshots.push(snapshot);
    history.state.activeIndex = snapshots.length - 1;

    updateNavigationState(history);
};
