import { useState, useEffect, useMemo } from 'react';

const useTabManagement = ({
    open,
    hasEndereco,
    hasFoto,
    hasObs,
}) => {
    const [tabIndex, setTabIndex] = useState(0);

    const tabOrder = useMemo(() => {
        const tabs = ['dados'];
        if (hasEndereco) tabs.push('endereco');
        if (hasFoto) tabs.push('foto');
        if (hasObs) tabs.push('obs');
        return tabs;
    }, [hasEndereco, hasFoto, hasObs]);

    const enderecoTabIndex = useMemo(() => tabOrder.indexOf('endereco'), [tabOrder]);
    const fotoTabIndex = useMemo(() => tabOrder.indexOf('foto'), [tabOrder]);
    const obsTabIndex = useMemo(() => tabOrder.indexOf('obs'), [tabOrder]);

    useEffect(() => {
        if (open) setTabIndex(0);
    }, [open]);

    return {
        tabIndex,
        setTabIndex,
        enderecoTabIndex,
        fotoTabIndex,
        obsTabIndex,
        tabOrder 
    };
};

export default useTabManagement;