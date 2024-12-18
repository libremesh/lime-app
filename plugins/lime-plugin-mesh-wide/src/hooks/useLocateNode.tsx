import L from "leaflet";
import { ComponentChildren, createContext } from "preact";
import { useContext, useRef, useState } from "preact/hooks";

const LocateNodeContext = createContext<
    ReturnType<typeof useLocateNodeProvider> | undefined
>(undefined);

export const LocateNodeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const locateNode = useLocateNodeProvider();
    return (
        <LocateNodeContext.Provider value={locateNode}>
            {children}
        </LocateNodeContext.Provider>
    );
};

const useLocateNodeProvider = () => {
    const [editingLocation, setEditingLocation] = useState(false);
    // MapRef is stored on here but should be moved to a more general place if used further
    const mapRef = useRef<L.Map | null>();

    return { editingLocation, setEditingLocation, mapRef };
};

export const useLocateNode = () => {
    const context = useContext(LocateNodeContext);
    if (context === null) {
        throw new Error(
            "useLocateNode must be used within a LocateNodeProvider"
        );
    }
    return context;
};
