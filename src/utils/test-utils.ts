import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';

export const buildMockCollection = (
  mockDocumentBodies: Object[]
): Observable<firebase.firestore.QueryDocumentSnapshot[]> => {
  const snapshots: firebase.firestore.QueryDocumentSnapshot[] = [];
  for (const body of mockDocumentBodies) {
    const snapshot = {
      data: () => {
        return { ...body } as any;
      },
      id: 'test',
    } as firebase.firestore.QueryDocumentSnapshot;
    snapshots.push(snapshot);
  }
  return of(snapshots);
};
