import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../../services/api/api";

// Configura o dayjs para usar fuso horário local (Brasil)
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

export default function useBackupConfig() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Busca configuração atual do backup
     */
    const fetchBackupConfig = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/backupConfig");

            const contentArray = data?.content || [];
            const item = contentArray.length > 0 ? contentArray[0] : null;

            if (!item) {
                setConfig(null);
                return;
            }

            const parsedData = {
                codBackupConfig: item.codBackupConfig,
                frequencia: item.frequencia,
                dtProximoBackup: item.dtProximoBackup
                    ? dayjs(item.dtProximoBackup).tz("America/Sao_Paulo")
                    : dayjs(),
                ativo: item.ativo,
            };

            setConfig(parsedData);
        } catch (error) {
            toast.error("Erro ao buscar configuração de backup.");
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Salva/atualiza configuração
     */
    const saveBackupConfig = useCallback(
        async (values, finish) => {
            setLoading(true);
            try {
                const payload = {
                    ...values,
                    ativo: values.ativo ? 1 : 0,
                    dtProximoBackup: values.dtProximoBackup
                        ? dayjs(values.dtProximoBackup)
                            .tz("America/Sao_Paulo")
                            .toISOString()
                        : null,
                };

                if (config?.codBackupConfig) {
                    await api.put(`/backupConfig/${config.codBackupConfig}`, payload);
                    toast.success("Configuração de backup atualizada com sucesso!");
                }

                fetchBackupConfig();
                if (finish) finish();
            } catch (error) {
                toast.error("Erro ao salvar configuração de backup.");
            } finally {
                setLoading(false);
            }
        },
        [config, fetchBackupConfig]
    );

    useEffect(() => {
        fetchBackupConfig();
    }, [fetchBackupConfig]);

    return {
        config,
        loading,
        fetchBackupConfig,
        saveBackupConfig,
    };
}
