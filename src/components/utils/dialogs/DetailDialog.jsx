import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { formatValue } from '../../../utils/Masks';
import { getEntityIcon } from '../../../utils/entityUtils';

const renderMaskedField = (field, value) => {
  let displayValue = formatValue(field, value ?? '');

  if (field.type === 'select' && Array.isArray(field.options)) {
    const option = field.options.find(opt => opt.value === value);
    displayValue = option?.label ?? value;
  }

  return (
    <Grid
      key={field.name}
      sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}
    >
      <TextField
        label={field.label}
        value={displayValue}
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
};

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
  const [tabIndex, setTabIndex] = useState(0);
  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";

  const empresaTabIndex = (() => {
    if (entity !== 'contato') return -1;
    return 1;
  })();

  const enderecoTabIndex = hasEndereco ? (empresaTabIndex >= 0 ? 2 : 1) : -1;
  const fotoTabIndex = hasFoto
    ? (enderecoTabIndex >= 0 ? enderecoTabIndex + 1 : empresaTabIndex >= 0 ? empresaTabIndex + 1 : 1)
    : -1;

  const obsTabIndex = (() => {
    if (!hasObs) return -1;
    let index = 1;
    if (empresaTabIndex >= 0) index++;
    if (enderecoTabIndex >= 0) index++;
    if (fotoTabIndex >= 0) index++;
    return index;
  })();

  useEffect(() => {
    if (open) {
      setTabIndex(0);
    }
  }, [open]);

  const filteredFields = fields.filter(
    f => !['cod_contato', 'cod_usuario', 'cod_empresa'].includes(f.name)
  );

  const renderFields = (fieldList, data = {}) => (
    <Grid container spacing={2} columns={12}>
      {
        fieldList
          .filter(field => field.name !== 'obs')
          .map(field =>
            renderMaskedField(field, data?.[field.name])
          )
      }
    </Grid>
  );

  const fotoUrl = formData?.foto || null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <IconButton
        aria-label="Fechar"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <InfoOutlinedIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
        {getEntityIcon(entity)}
        <Typography variant="h6" component="span">{title}</Typography>
      </DialogTitle>

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
          {tabIndex === 0 && renderFields(filteredFields, formData)}
          {tabIndex === empresaTabIndex && empresaTabIndex >= 0 && (
            <Grid container spacing={2} columns={12}>
              {empresaFields.map(field =>
                renderMaskedField(
                  field,
                  field.name === 'cod_empresa'
                    ? formData?.cod_empresa
                    : formData?.empresa?.[field.name]
                )
              )}
            </Grid>
          )}
          {tabIndex === enderecoTabIndex && hasEndereco && renderFields(enderecoFields, formData?.endereco)}
          {tabIndex === fotoTabIndex && hasFoto && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {fotoUrl ? (
                  entity === 'usuario' ? (
                    <Avatar
                      alt="Foto"
                      src={fotoUrl}
                      sx={{ width: 96, height: 96 }}
                    />
                  ) : (
                    <Box mt={2}>
                      <img
                        src={fotoUrl}
                        alt="Foto"
                        style={{ maxWidth: '100%', maxHeight: 200 }}
                      />
                    </Box>
                  )
                ) : (
                  <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Nenhuma foto disponível para este {entity === 'usuario' ? 'usuário' : entity}.
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}

          {hasObs && tabIndex === obsTabIndex && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Observações"
                value={formData?.obs || ''}
                fullWidth
                multiline
                minRows={10}
                maxRows={Infinity}
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: '#e3f2fd',
                    borderRadius: 1,
                    height: '100%',
                    alignItems: 'flex-start'
                  },
                }}
                margin="dense"
                sx={{ flex: 1 }}
              />
            </Box>
          )}

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;