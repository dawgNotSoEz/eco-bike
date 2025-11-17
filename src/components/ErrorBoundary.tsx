import React, { ReactNode, ErrorInfo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.content}>
            <Text style={styles.title}>⚠️ App Error</Text>
            <Text style={styles.error}>{this.state.error?.toString()}</Text>
            {this.state.errorInfo && (
              <Text style={styles.stack}>{this.state.errorInfo.componentStack}</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#ff5252',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    color: '#ffb3b3',
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'monospace',
  },
  stack: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'monospace',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#00d084',
    padding: 16,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
