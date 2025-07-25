import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  TextField
} from '@mui/material';
import { useEntityUtils } from '../../../hooks/useEntityUtils';
import DialogHeader from './components/DialogHeader';
import ObservacoesField from './components/ObservacoesField';
import PhotoUploader from './components/PhotoUploader';
import TabbedFormLayout from './components/TabbedFormLayout';
import useTabManagement from './hooks/useTabManager';
import DialogTransition from './transition/DialogTransitions';
import { useMaskUtils } from '../../../hooks/useMaskUtils';

const DetailDialog = ({
  open,
  onClose,
  formData,
  title,
  titleTab,
  titleTab2,
  fields = [],
  enderecoFields = [],
  empresaFields = [],
  entity,
  usaFoto = false,
}) => {
  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";
  const hasEmpresa = entity === "contato";

  const {
    tabIndex,
    setTabIndex
  } = useTabManagement({ open, hasEndereco, hasEmpresa, hasFoto, hasObs });

  const filteredFields = fields.filter(
    f => !['cod_contato', 'cod_usuario', 'cod_empresa'].includes(f.name)
  );

  const { getEntityIcon } = useEntityUtils();
  const { formatValue } = useMaskUtils();

  const fotoUrl = formData?.foto || null;

  const renderField = (field, value, prefix = '') => {
    const displayValue = formatValue(field, value ?? '');

    if (field.type === 'select' && Array.isArray(field.options)) {
      const option = field.options.find(opt => opt.value === value);
      return option?.label ?? value;
    }

    return displayValue;
  };

  const renderFields = (fieldList, data = {}, prefix = '') => (
    <Grid container spacing={2} columns={12}>
      {fieldList
        .filter(field => field.name !== 'obs')
        .map(field => {
          const value = prefix ? data?.[field.name] : formData?.[field.name];
          return (
            <Grid
              key={prefix ? `${prefix}.${field.name}` : field.name}
              sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}
            >
              <TextField
                label={field.label}
                value={renderField(field, value)}
                fullWidth
                multiline={field.type === 'textarea'}
                rows={field.type === 'textarea' ? 3 : 1}
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: '#e3f2fd',
                    borderRadius: 1,
                  },
                }}
                margin="dense"
              />
            </Grid>
          );
        })}
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={DialogTransition}
    >
      <DialogHeader
        icon={<InfoOutlinedIcon />}
        title={title}
        entityIcon={getEntityIcon(entity)}
        onClose={onClose}
        submitting={false}
      />

      <DialogContent
        dividers
        sx={{
          minHeight: 450,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}
      >
        <TabbedFormLayout
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          sx={{ mb: 2 }}
          tabs={[
            {
              label: titleTab,
              content: renderFields(filteredFields, formData)
            },
            {
              label: 'Empresa',
              content: renderFields(empresaFields, formData?.empresa, 'empresa'),
              condition: hasEmpresa
            },
            {
              label: titleTab2,
              content: renderFields(enderecoFields, formData?.endereco, 'endereco'),
              condition: hasEndereco
            },
            {
              label: 'Foto',
              content: (
                <PhotoUploader
                  entity={entity}
                  previewUrl={fotoUrl}
                  onSelect={() => { }}
                  onClear={() => { }}
                  showClear={false}
                  disabled
                />
              ),
              condition: hasFoto
            },
            {
              label: 'Observações',
              content: (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <ObservacoesField
                    value={formData?.obs || ''}
                    readOnly={true}
                    standalone
                    style={{
                      backgroundColor: '#e3f2fd',
                      borderRadius: 1,
                      height: '100%',
                      alignItems: 'flex-start'
                    }}
                  />
                </Box>
              ),
              condition: hasObs
            }
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
