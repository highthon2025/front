# iOS 설치 가이드

## 방법 1: Expo Go 앱 사용 (개발 중 가장 빠른 방법)

1. App Store에서 "Expo Go" 앱을 다운로드
2. 터미널에서 다음 명령어 실행:
   ```bash
   npm start
   # 또는
   npx expo start
   ```
3. QR 코드를 Expo Go 앱으로 스캔하거나, 같은 WiFi 네트워크에서 앱을 실행

## 방법 2: 개발용 빌드 (실제 기기 테스트)

1. Apple Developer 계정 필요 (무료 계정도 가능)
2. 다음 명령어로 개발용 빌드 생성:
   ```bash
   npx eas build --platform ios --profile development
   ```
3. 빌드 완료 후 QR 코드나 다운로드 링크를 통해 설치

## 방법 3: iOS 시뮬레이터

1. Xcode가 설치되어 있어야 함
2. 다음 명령어로 시뮬레이터용 빌드:
   ```bash
   npx eas build --platform ios --profile development --local
   ```
3. 생성된 .app 파일을 시뮬레이터에 드래그 앤 드롭

## 방법 4: 프로덕션 빌드 (App Store 배포용)

1. Apple Developer Program 가입 필요 ($99/년)
2. 다음 명령어로 프로덕션 빌드:
   ```bash
   npx eas build --platform ios --profile production
   ```
3. App Store Connect를 통해 배포

## 현재 설정

- Bundle Identifier: `com.anonymous.gaga`
- 앱 이름: "Gaga"
- 버전: 1.0.0

## 주의사항

- 실제 기기에 설치하려면 Apple Developer 계정이 필요합니다
- 개발 중에는 Expo Go 앱을 사용하는 것이 가장 편리합니다
- 프로덕션 배포시에는 Bundle Identifier를 고유한 값으로 변경해야 합니다
