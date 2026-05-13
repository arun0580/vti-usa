export {
  getResendClient,
  getFromAddress,
  getNotificationRecipient,
  parseRecipients,
} from "./client";

export {
  validateFormPayload,
  isFormType,
  type FormType,
  type FormPayload,
  type FormDataMap,
  type ContactFormData,
  type ResellerSignupFormData,
  type PartnerApplicationFormData,
} from "./validators";

export {
  buildTemplateFor,
  renderEmailHtml,
  escapeHtml,
  type EmailTemplate,
  type EmailField,
} from "./templates";

export {
  sendEmail,
  submitFormEmail,
  deriveBaseUrl,
  type SendEmailInput,
  type SendEmailResult,
} from "./service";

export { checkRateLimit, getClientIp } from "./rate-limit";
