const nodemailer = require('nodemailer');
const pool = require("../../database/dbConnection");

const SendEmail = async ( emailFrom , id_usuario )  => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'johnpaul.steuber29@ethereal.email',
                pass: 'Rsur1wDWXRhnnqy3V9'
            }
        });
        const emailUser = await pool.query(`SELECT * FROM usu_pre WHERE usu_pre.id_usuario = $1;`,[id_usuario]);
    
        const emailOptions = {

            from: emailFrom,
            to: emailUser.rows[0].correo,
            subject: 'APROBACION DEL PRESTAMO SOLICIDATO ✔',            
            html: `
        <body>
            <div class="es-wrapper-color">
                <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#87c3f4" origin="0.5, 0" position="0.5, 0"></v:fill>
                    </v:background>
                <![endif]-->
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="esd-email-paddings" valign="top">
                                <table class="esd-header-popover es-header" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left" bgcolor="#999999" style="background-color: #999999;">
                                                                <table cellspacing="0" cellpadding="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                <a target="_blank"><img class="adapt-img" src="https://uxhiqc.stripocdn.email/content/guids/CABINET_c078f1711f455cbd398a03415531eaa4/images/2972146.png" alt style="display: block;" width="100"></a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left" bgcolor="#efefef" style="background-color: #efefef;">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                <a target="_blank"><img class="adapt-img" src="https://bibliotecasmedellin.gov.co/wp-content/uploads/2021/05/P1460649-1200x700.jpg" alt style="display: block;" width="560"></a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="esd-footer-popover es-footer" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20" align="left" bgcolor="#efefef" style="background-color: #efefef;">
                                                                <!--[if mso]><table width="560" cellpadding="0" 
                                cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                                <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p5">
                                                                                                <p style="line-height: 120%; font-size: 20px;">INGRESAR<br><br></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text" esd-links-color="#0b5394">
                                                                                                <p>ingresa para ver tus libros aceptados<br>en nuestra pagina<br><br><u><a target="_blank" style="color: #0b5394;">Leer Mas...</a></u></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                                <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="270" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text">
                                                                                                <p style="font-size: 20px;">MAS CONTENIDO<br><br></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text" esd-links-color="#0b5394">
                                                                                                <p>tenemos mas libros y contenido<br>en nuestra pagina<br><br><a target="_blank" style="color: #0b5394;">Leer Mas...</a></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td></tr></table><![endif]-->
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#999999" style="background-color: #999999;">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text">
                                                                                                <p style="font-size: 13px; color: #ffffff;">blibioteca digital SAS. carrera 24 64 B</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>`

        };
        
        transporter.sendMail( emailOptions , (err , info) => {
            
            if (err) {
                throw new Error(`OCURRIO UN DENTRO DEL CODIGO DE NODEMAILER : ${err}`);
            }else{
                console.log("se envio un correo ");
            }
        })

    } catch (error) {

        throw new Error(`OCURRIO UN DENTRO DEL CODIGO DE NODEMAILER : ${error}`);
    }
   
}

module.exports = { SendEmail };
