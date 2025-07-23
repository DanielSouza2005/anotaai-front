import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { getEntityIcon } from '../../../utils/entityUtils';
import { formatValue } from '../../../utils/Masks';
import DialogHeader from './components/DialogHeader';
import ObservacoesField from './components/ObservacoesField';
import PhotoUploader from './components/PhotoUploader';
import TabPanel from './components/TabPanel';
import useTabManagement from './hooks/useTabManager';
import DialogTransition from './transition/DialogTransitions';

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
    setTabIndex,
    empresaTabIndex,
    enderecoTabIndex,
    fotoTabIndex,
    obsTabIndex
  } = useTabManagement({ open, hasEndereco, hasEmpresa, hasFoto, hasObs });

  const filteredFields = fields.filter(
    f => !['cod_contato', 'cod_usuario', 'cod_empresa'].includes(f.name)
  );

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
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          sx={{ mb: 2 }}
        >
          <Tab label={titleTab} />
          {empresaTabIndex >= 0 && <Tab label="Empresa" />}
          {hasEndereco && <Tab label={titleTab2} />}
          {hasFoto && <Tab label="Foto" />}
          {hasObs && <Tab label="Observações" />}
        </Tabs>

        <Box>
          <TabPanel value={tabIndex} index={0}>
            {renderFields(filteredFields, formData)}
          </TabPanel>

          {empresaTabIndex >= 0 && (
            <TabPanel value={tabIndex} index={empresaTabIndex}>
              {renderFields(empresaFields, formData?.empresa)}
            </TabPanel>
          )}

          {hasEndereco && (
            <TabPanel value={tabIndex} index={enderecoTabIndex}>
              {renderFields(enderecoFields, formData?.endereco, 'endereco')}
            </TabPanel>
          )}

          {hasFoto && (
            <TabPanel value={tabIndex} index={fotoTabIndex}>
              <PhotoUploader
                entity={entity}
                previewUrl={fotoUrl}
                onSelect={() => { }}
                onClear={() => { }}
                showClear={false}
                disabled
              />
            </TabPanel>
          )}

          {hasObs && (
            <TabPanel value={tabIndex} index={obsTabIndex}>
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
            </TabPanel>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;