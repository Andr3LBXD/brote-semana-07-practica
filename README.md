# Brote · Planificador estudiantil

![Brote, tu compañero de estudio](assets/images/portada.png)

Aplicación móvil hecha con Expo Router para organizar tareas y clases. Guarda los cambios localmente con AsyncStorage; no necesita una cuenta ni conexión a un servicio.

## Empezar

```sh
npm ci
npm run start
```

Usa `npm run android`, `npm run ios` o `npm run web` para abrir la plataforma correspondiente. Los perfiles EAS están en `eas.json`: `development`, `preview`, `preview-apk`, `preview-simulator` y `production`. El perfil de desarrollo requiere una development build; `preview-apk` genera un APK instalable.

## Identificadores de compilación

La configuración inicial usa `edu.uets.brote.demo` como ejemplo; sustitúyelo por un identificador único de tu proyecto. Esta copia inicia sin vinculación EAS: vincúlala a un proyecto propio antes de compilar. No publiques credenciales.

## Construir en la nube

```sh
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --platform android --profile preview-apk
npx eas-cli@latest build --platform ios --profile preview-simulator
```

El APK se instala en Android. El artefacto iOS es para simulador, no para instalar en un iPhone físico: se puede presentar en Appetize. Un development build necesita el cliente de desarrollo; preview incluye su JavaScript y se prueba con Metro apagado. Las cuotas dependen de la cuenta. Expo Go solo sirve si su versión y módulos son compatibles con el SDK 57 del proyecto.

## Recorrido de demostración

Guardar tu nombre → crear una tarea → buscarla y filtrar → completarla → agregar una clase → cambiar tema → cerrar y abrir. AsyncStorage conserva datos locales; no sincroniza entre dispositivos ni está destinado a secretos. En simuladores remotos se verifica dentro de la misma sesión.

## Comprobaciones locales

```sh
npm run lint
npm run typecheck
npm test
npx expo-doctor
npx expo export --platform all
```
