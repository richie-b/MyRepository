using System;
using System.Collections.Generic;
using System.CodeDom.Compiler;
using Microsoft.VisualStudio.TestTools.UITest.Extension;
using Microsoft.VisualStudio.TestTools.UITesting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Keyboard = Microsoft.VisualStudio.TestTools.UITesting.Keyboard;
using Mouse = Microsoft.VisualStudio.TestTools.UITesting.Mouse;
using MouseButtons = System.Windows.Forms.MouseButtons;
using System.Drawing;
using System.Windows.Input;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UITesting.HtmlControls;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;
using Excel = Microsoft.Office.Interop.Excel;
using Access = Microsoft.Office.Interop.Access;
//using Microsoft.Office.Interop.Access.Dao;
using System.Data.OleDb;
using System.IO;
using System.Diagnostics;

namespace TestProject
{
    class Utilities
    {

        /**Gets the value from the given table**/
        public String getDataDrivenValue(Excel.Workbook appWorkbook, int row, String column)
        {
            Range tableRange;
            Excel._Worksheet appWorkSheet = null;
            int rowCount = 0;
            int columnCount = 0;
            int columnCounter = 1;
            String value = "";

            //Get worksheet and row/column counts
            appWorkSheet = (_Worksheet) appWorkbook.Worksheets.get_Item(1);
            rowCount = appWorkSheet.UsedRange.Rows.Count;
            columnCount = appWorkSheet.UsedRange.Columns.Count;

            /**Find the column**/
            while (columnCounter <= columnCount)
            {
                //First row has column names
                tableRange = appWorkSheet.Cells[1, columnCounter] as Range;
                value = tableRange.Text as string;

                if (value.Equals(column))
                {
                    tableRange = appWorkSheet.Cells[row, columnCounter] as Range;
                    value = tableRange.Text as string;
                    break;
                }

                else
                {
                    columnCounter++;
                }
            }


            return value;

        }


        /**Compares baseline to Excel files**/
        public void compareExcel(String baselinePath, String testFilePath, String resultsPath)
        {

            String baselineFile = baselinePath;
            String testFile = testFilePath;
            String resultsLocation = resultsPath;
            String baselineValue, testValue;
            int columnCountBaseline = 0;
            int rowCountBaseline = 0;
            int columnCountTestFile = 0;
            int rowCountTestFile = 0;
            int i = 1;
            int j = 1;
            int errorCount = 0;
            Range baselineRange, testFileRange;

            Excel.Application appExcel;
            Excel.Workbook baselineWorkbook = null;
            Excel.Workbook testWorkbook = null;
            Excel._Worksheet baselineSheet = null;
            Excel._Worksheet testSheet = null;

            //Prepare results file
            StreamWriter sw = new StreamWriter(resultsLocation);

            //Launch Excel Application
            appExcel = new Excel.Application();
            appExcel.Visible = true;

            //Check if file exists
            if (checkFileExists(baselineFile) & checkFileExists(testFile))
            {
                // then go and load this into excel
                baselineWorkbook = appExcel.Workbooks.Open(baselineFile, true, true);
                testWorkbook = appExcel.Workbooks.Open(testFile, true, true);

                baselineSheet = (_Worksheet)baselineWorkbook.Worksheets.get_Item(1);
                testSheet = (_Worksheet)testWorkbook.Worksheets.get_Item(1);

                rowCountBaseline = baselineSheet.UsedRange.Rows.Count;
                columnCountBaseline = baselineSheet.UsedRange.Columns.Count;
                rowCountTestFile = testSheet.UsedRange.Rows.Count;
                columnCountTestFile = testSheet.UsedRange.Columns.Count;
            }

            else
            {
                MessageBox.Show("Unable to open file!");
                appExcel.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(appExcel);
                System.Windows.Forms.Application.Exit();
            }

            //Sort files if neccessary
            //TODO



            //Compare files
            try
            {
                while (i <= rowCountBaseline)
                {
                    while (j <= columnCountBaseline)
                    {

                        //baselineValue = baselineSheet.get_Range("A3").get_Value().ToString();
                        //testValue = testSheet.get_Range("A4").get_Value().ToString();
                        //testFileRange = testSheet.Cells[i, j] as Range;
                        //testValue = testFileRange.Value2.ToString();

                        testFileRange = testSheet.Cells[i, j] as Range;
                        testValue = testFileRange.Text as string;

                        baselineRange = baselineSheet.Cells[i, j] as Range;
                        baselineValue = baselineRange.Text as string;

                        if (!testValue.Equals(baselineValue))
                        {
                            //System.Diagnostics.Debug.WriteLine("*******************************");
                            sw.WriteLine("*******************************");
                            sw.WriteLine("Comparison found error with cell at Row: " + i + ", Column: " + j);
                            sw.WriteLine("Test Value: " + testValue);
                            sw.WriteLine("Base Value: " + baselineValue);
                            sw.WriteLine("*******************************");
                            sw.WriteLine(System.Environment.NewLine);
                            sw.WriteLine(System.Environment.NewLine);
                            errorCount++;
                        }
                        j++;
                    }
                    i++;
                    j = 1;
                }
            }
            catch (Exception e)
            {

                System.Diagnostics.Debug.WriteLine("Null Pointer Exception at Row: " + i + ", Column: " + j);
            }

            if (errorCount == 0 && rowCountBaseline == rowCountTestFile && columnCountBaseline == columnCountTestFile)
            {
                sw.WriteLine("*******************************");
                sw.WriteLine("NO ERRORS FOUND DURING COMPARISON.");
                sw.WriteLine("ERRORS: " + errorCount);
                sw.WriteLine("ROWS BASELINE: " + rowCountBaseline);
                sw.WriteLine("ROWS TESTFILE: " + rowCountTestFile);
                sw.WriteLine("COLUMNS BASELINE: " + columnCountBaseline);
                sw.WriteLine("COLUMNS TESTFILE: " + columnCountTestFile);
                sw.WriteLine("*******************************");
            }

            else
            {
                sw.WriteLine("*******************************");
                sw.WriteLine("NUMBER OF DATA ERRORS FOUND DURING COMPARISON: " + errorCount);
                sw.WriteLine("*******************************");
                sw.WriteLine("ROWS BASELINE: " + rowCountBaseline);
                sw.WriteLine("ROWS TESTFILE: " + rowCountTestFile);
                sw.WriteLine("COLUMNS BASELINE: " + columnCountBaseline);
                sw.WriteLine("COLUMNS TESTFILE: " + columnCountTestFile);

            }


            //Close the Excel files
            testWorkbook.Close();
            baselineWorkbook.Close();
            appExcel.Quit();
            this.releaseObject(baselineSheet);
            this.releaseObject(baselineWorkbook);
            this.releaseObject(appExcel);
            //Close the results file 
            sw.Close();


        }

        /**Releases object for garbage collection**/
        public void releaseObject(object obj)
        {
            try
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(obj);
                obj = null;
            }
            catch (Exception ex)
            {
                obj = null;
                MessageBox.Show("Unable to release the Object " + ex.ToString());
            }
            finally
            {
                GC.Collect();
            }
        }

        /**Checks if a file location exists**/
        public Boolean checkFileExists(String path)
        {
            //Check if file exists
            if (!System.IO.File.Exists(path))
            {
                MessageBox.Show("Unable to open file: " + path);
                return false;
            }

            else
            {
                return true;
            }


        }

        public void waitForResults(String report)
        {
            String cssText = "";

            if (report.Equals("activity"))
            {
                //UIMdiv_mid_bcol_ad_actPane;

                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Activity - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                //UITestControl spinnerz = new UITestControl(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_activity_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_activity_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("balances"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Balances - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_balances_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_balances_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("holdings"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Holdings Detail - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_holdings_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_holdings_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("estimated div"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Dividends - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_est_div_int_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_est_div_int_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("account profile"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Account Profile - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_acct_profile_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_acct_profile_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("unrealized"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Unrealized Gain/Loss - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_unrealized_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_unrealized_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("realized"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Realized Gain/Loss - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_realized_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_realized_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("statements"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Monthly Statements - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_statements_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_statements_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

            else if (report.Equals("preferences"))
            {
                BrowserWindow bcolWindow = new BrowserWindow();
                bcolWindow.SearchProperties.Add("DisplayText", "Broadcort Online :: Preferences - Windows Internet Explorer");
                bcolWindow.Find();
                HtmlDiv spinner = new HtmlDiv(bcolWindow);
                spinner.TechnologyName = "Web";
                spinner.SearchProperties.Add("Id", "mdiv_mid_bcol_ad_preferences_spinner");
                spinner.SearchProperties.Add("TagName", "DIV");
                spinner.SearchProperties.Add("ControlType", "Pane");
                spinner.SearchProperties.Add("FriendlyName", "mdiv_mid_bcol_ad_preferences_spinner");
                spinner.SearchProperties.Add("ClassName", "HtmlPane");
                cssText = spinner.GetProperty("ControlDefinition") as string;

                while (true)
                {
                    if (cssText.IndexOf("DISPLAY: none") > 0)
                    {
                        break;
                    }
                    cssText = spinner.GetProperty("ControlDefinition") as string;
                }

            }

        }



        /**Opens Database For Query**/
        //Not complete
        public void openDatabase()
        {
            //String dataBaseName = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\myAccessFile.accdb"; //Defines the location of the database and its type.

            {
                //create the database connection
                OleDbConnection aConnection = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\Users\\nbkoqnl\\Documents\\Visual Studio 2013\\Projects\\BCOL 2.0 Automation\\BCOL 2.0 Automation\\MAS_RiQQA.mdb");

                //create the command object and store the sql query
                OleDbCommand aCommand = new OleDbCommand("select * from T:TXN_PROJECT_TABLE", aConnection);
                try
                {
                    aConnection.Open();

                    //create the datareader object to connect to table
                    OleDbDataReader aReader = aCommand.ExecuteReader();
                    Console.WriteLine("This is the returned data from T:TXN_PROJECT_TABLE table");

                    //Iterate throuth the database
                    while (aReader.Read())
                    {
                        Console.WriteLine(aReader.GetInt32(0).ToString());
                    }

                    //close the reader 
                    aReader.Close();

                    //close the connection Its important.
                    aConnection.Close();
                }

                //Some usual exception handling
                catch (OleDbException e)
                {
                    Console.WriteLine("Error: {0}", e.Errors[0].Message);
                }
            }

        }

    }
}
