type EmailType = {
  name: string
  token: string
}

export const confirmationEmailTemplate = (
  user: EmailType,
  confirmUrl: string
): string => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirma tu cuenta - UpTask</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <!-- Header with gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 0;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 48px 40px; text-align: center;">
                                        <!-- Logo/Icon -->
                                        <div style="background-color: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 11L12 14L22 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">UpTask</h1>
                                        <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500;">Gestión de Proyectos</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 48px 40px;">
                            <!-- Greeting -->
                            <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 26px; font-weight: 700; line-height: 1.3;">
                                ¡Hola, ${user.name}! 👋
                            </h2>
                            
                            <p style="margin: 0 0 24px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Tu cuenta en <strong style="color: #6366f1;">UpTask</strong> ha sido creada exitosamente. Estás a un paso de comenzar a gestionar tus proyectos de manera eficiente.
                            </p>
                            
                            <!-- Info Box -->
                            <div style="background: linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%); border: 2px solid #e0e7ff; border-radius: 12px; padding: 24px; margin: 0 0 32px;">
                                <p style="margin: 0 0 12px; color: #1f2937; font-size: 15px; font-weight: 600;">
                                    ⏱️ Tu código de confirmación es:
                                </p>
                                <div style="background-color: #ffffff; border: 2px dashed #6366f1; border-radius: 8px; padding: 16px; text-align: center;">
                                    <p style="margin: 0; color: #6366f1; font-size: 32px; font-weight: 800; letter-spacing: 4px; font-family: 'Courier New', Courier, monospace;">
                                        ${user.token}
                                    </p>
                                </div>
                                <p style="margin: 16px 0 0; color: #6b7280; font-size: 13px; text-align: center;">
                                    ⚠️ Este código expirará en <strong>10 minutos</strong>
                                </p>
                            </div>
                            
                            <p style="margin: 0 0 24px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Haz clic en el botón de abajo para confirmar tu cuenta:
                            </p>
                            
                            <!-- Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 0 0 32px;">
                                        <a href="${confirmUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); transition: all 0.3s ease;">
                                            ✓ Confirmar mi cuenta
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Divider -->
                            <div style="border-top: 1px solid #e5e7eb; margin: 32px 0; padding-top: 32px;">
                                <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                    Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                                </p>
                                <p style="margin: 0; padding: 12px; background-color: #f9fafb; border-radius: 8px; word-break: break-all;">
                                    <a href="${confirmUrl}" style="color: #6366f1; text-decoration: none; font-size: 13px;">
                                        ${confirmUrl}
                                    </a>
                                </p>
                            </div>
                            
                            <!-- Security Notice -->
                            <div style="background-color: #1f2937; border-radius: 12px; padding: 20px; margin: 32px 0 0;">
                                <p style="margin: 0 0 8px; color: #f3f4f6; font-size: 14px; font-weight: 600;">
                                    🔒 Aviso de Seguridad
                                </p>
                                <p style="margin: 0; color: #d1d5db; font-size: 13px; line-height: 1.6;">
                                    Si no creaste esta cuenta, ignora este correo. Tu información está segura y no se realizará ninguna acción.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px; font-weight: 600;">
                                            UpTask
                                        </p>
                                        <p style="margin: 0 0 16px; color: #9ca3af; font-size: 13px;">
                                            Gestiona tus proyectos de manera eficiente
                                        </p>
                                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                            © ${new Date().getFullYear()} UpTask. Todos los derechos reservados.
                                        </p>
                                        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">
                                            Este es un correo automático, por favor no responder.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
