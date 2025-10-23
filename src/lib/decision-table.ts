/**
 * Decision Table Testing Framework
 * 
 * This framework implements decision table methodology for automated testing.
 * Decision tables help systematically test all combinations of conditions and actions.
 */

export interface DecisionTableRule {
  id: string;
  description: string;
  conditions: Record<string, any>;
  expectedActions: Record<string, any>;
}

export interface DecisionTable {
  name: string;
  description: string;
  conditions: string[];
  actions: string[];
  rules: DecisionTableRule[];
}

export class DecisionTableRunner {
  /**
   * Execute a decision table test
   * @param table The decision table to execute
   * @param testFunction Function that takes conditions and returns actual actions
   */
  static async executeTable<T extends Record<string, any>>(
    table: DecisionTable,
    testFunction: (conditions: Record<string, any>) => Promise<T> | T
  ): Promise<{ rule: DecisionTableRule; result: T; passed: boolean }[]> {
    const results = [];

    for (const rule of table.rules) {
      try {
        const actualActions = await testFunction(rule.conditions);
        const passed = this.compareActions(rule.expectedActions, actualActions);
        
        results.push({
          rule,
          result: actualActions,
          passed
        });
      } catch (error) {
        results.push({
          rule,
          result: { error: error.message } as T,
          passed: false
        });
      }
    }

    return results;
  }

  /**
   * Compare expected and actual actions
   */
  private static compareActions(expected: Record<string, any>, actual: Record<string, any>): boolean {
    for (const [key, expectedValue] of Object.entries(expected)) {
      if (actual[key] !== expectedValue) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generate Jest test cases from decision table
   */
  static generateJestTests(
    table: DecisionTable,
    testFunction: (conditions: Record<string, any>) => Promise<any> | any
  ) {
    describe(table.name, () => {
      table.rules.forEach((rule) => {
        test(`${rule.id}: ${rule.description}`, async () => {
          const actualActions = await testFunction(rule.conditions);
          
          Object.entries(rule.expectedActions).forEach(([key, expectedValue]) => {
            expect(actualActions[key]).toBe(expectedValue);
          });
        });
      });
    });
  }
}